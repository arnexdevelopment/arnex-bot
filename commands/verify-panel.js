const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('verify-panel').setDescription('Send verification panel.').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Verification').setDescription('Click the button below to verify your account.').setFooter({ text: config.brandName });
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('verify_button').setLabel('Verify').setEmoji('✅').setStyle(ButtonStyle.Success));
  await interaction.channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: 'Verification panel sent.', ephemeral: true });
}};
