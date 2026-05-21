const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('order-panel').setDescription('Send order panel.').setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Create Order').setDescription('Click the button below and describe your project.').setFooter({ text: config.brandName });
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('order_modal_open').setLabel('Create Order').setEmoji('📦').setStyle(ButtonStyle.Primary));
  await interaction.channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: 'Order panel sent.', ephemeral: true });
}};
