const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = { data: new SlashCommandBuilder().setName('removeuser').setDescription('Remove user from current ticket.').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels).addUserOption(o => o.setName('user').setDescription('User to remove').setRequired(true)), async execute(interaction){
  const user = interaction.options.getUser('user');
  await interaction.channel.permissionOverwrites.delete(user.id).catch(() => null);
  await interaction.reply({ content: `${user} removed from this channel.`, ephemeral: true });
}};
