const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('embed').setDescription('Send a custom embed.').setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages).addStringOption(o => o.setName('title').setDescription('Embed title').setRequired(true).setMaxLength(120)).addStringOption(o => o.setName('description').setDescription('Embed description').setRequired(true).setMaxLength(2000)), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle(interaction.options.getString('title')).setDescription(interaction.options.getString('description')).setFooter({ text: config.brandName }).setTimestamp();
  await interaction.channel.send({ embeds: [embed] });
  await interaction.reply({ content: 'Embed sent.', ephemeral: true });
}};
