const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const { sendLog } = require('../systems/logs');
module.exports = { data: new SlashCommandBuilder().setName('review').setDescription('Submit a review.').addIntegerOption(o => o.setName('rating').setDescription('Rating from 1 to 5').setRequired(true).setMinValue(1).setMaxValue(5)).addStringOption(o => o.setName('service').setDescription('Service you ordered').setRequired(true).setMaxLength(80)).addStringOption(o => o.setName('message').setDescription('Your review').setRequired(true).setMaxLength(700)), async execute(interaction){
  await interaction.deferReply({ ephemeral: true });
  const rating = interaction.options.getInteger('rating');
  const service = interaction.options.getString('service');
  const message = interaction.options.getString('message');
  const channelId = config.channels.reviewsChannelId;
  if(!channelId || channelId.includes('_ID')) return interaction.editReply('Reviews channel is not configured.');
  const channel = await interaction.guild.channels.fetch(channelId).catch(() => null);
  if(!channel) return interaction.editReply('Reviews channel was not found.');
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('New Review').addFields(
    { name: 'Client', value: `${interaction.user}`, inline: true },
    { name: 'Rating', value: '⭐'.repeat(rating), inline: true },
    { name: 'Service', value: service.slice(0, 1024) },
    { name: 'Review', value: message.slice(0, 1024) }
  ).setFooter({ text: config.brandName }).setTimestamp();
  await channel.send({ embeds: [embed] });
  await sendLog(interaction.guild, 'Review Submitted', `${interaction.user} submitted a ${rating}/5 review.`);
  await interaction.editReply('Review submitted. Thank you.');
}};
