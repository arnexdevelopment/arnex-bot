const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('status').setDescription('Show bot status.'), async execute(interaction, client){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Bot Status').addFields({ name: 'Ping', value: `${Math.round(client.ws.ping)}ms`, inline: true }, { name: 'Uptime', value: `${Math.floor(process.uptime())}s`, inline: true }, { name: 'Guilds', value: `${client.guilds.cache.size}`, inline: true }).setTimestamp();
  await interaction.reply({ embeds: [embed], ephemeral: true });
}};
