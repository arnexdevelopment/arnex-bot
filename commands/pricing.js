const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('pricing').setDescription('Show basic pricing information.'), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Pricing').setDescription('Prices depend on complexity. Open a ticket for an exact quote.').addFields(
    { name: 'Discord Bot', value: 'Starting from 10€', inline: true }, { name: 'FiveM Script', value: 'Starting from 15€', inline: true }, { name: 'Website', value: 'Starting from 20€', inline: true }, { name: 'UI / NUI', value: 'Starting from 15€', inline: true }, { name: 'Bug Fix', value: 'Starting from 5€', inline: true }
  ).setFooter({ text: config.brandName });
  await interaction.reply({ embeds: [embed], ephemeral: true });
}};
