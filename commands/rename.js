const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = { data: new SlashCommandBuilder().setName('rename').setDescription('Rename current channel.').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels).addStringOption(o => o.setName('name').setDescription('New channel name').setRequired(true).setMaxLength(80)), async execute(interaction){
  const name = interaction.options.getString('name').toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 80);
  await interaction.channel.setName(name);
  await interaction.reply({ content: `Channel renamed to ${name}.`, ephemeral: true });
}};
