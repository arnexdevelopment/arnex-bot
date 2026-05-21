const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('ticket-panel').setDescription('Send ticket panel.').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Create Ticket').setDescription(['Need a custom system?','','Choose what you need:','💻 Website','🤖 Discord Bot','🎮 FiveM Script','🎨 UI / Design','🛠️ Bug Fix','📦 Other'].join('\n')).setFooter({ text: config.brandName });
  const menu = new StringSelectMenuBuilder().setCustomId('ticket_select').setPlaceholder('Select ticket type').addOptions(
    { label: 'Website', value: 'website', emoji: '💻' }, { label: 'Discord Bot', value: 'discord_bot', emoji: '🤖' }, { label: 'FiveM Script', value: 'fivem', emoji: '🎮' }, { label: 'UI / Design', value: 'ui_design', emoji: '🎨' }, { label: 'Bug Fix', value: 'bug_fix', emoji: '🛠️' }, { label: 'Other', value: 'other', emoji: '📦' }
  );
  await interaction.channel.send({ embeds: [embed], components: [new ActionRowBuilder().addComponents(menu)] });
  await interaction.reply({ content: 'Ticket panel sent.', ephemeral: true });
}};
