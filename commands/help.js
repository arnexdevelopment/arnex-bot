const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('help').setDescription('Show bot commands.'), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle(`${config.brandName} Help`).setDescription('Available commands:').addFields(
    { name: '/services', value: 'Show available services.' },
    { name: '/pricing', value: 'Show starting prices.' },
    { name: '/ticket-panel', value: 'Send ticket panel. Staff only.' },
    { name: '/verify-panel', value: 'Send verification panel. Staff only.' },
    { name: '/order-panel', value: 'Send order panel. Staff only.' },
    { name: '/review', value: 'Submit a client review.' },
    { name: '/status', value: 'Show bot status.' }
  ).setFooter({ text: config.brandName });
  await interaction.reply({ embeds: [embed], ephemeral: true });
}};
