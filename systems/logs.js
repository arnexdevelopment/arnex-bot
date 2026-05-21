const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
async function sendLog(guild, title, description){
  const id = config.channels.logsChannelId;
  if(!id || id.includes('_ID')) return;
  const channel = await guild.channels.fetch(id).catch(() => null);
  if(!channel) return;
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle(title).setDescription(description).setTimestamp();
  await channel.send({ embeds: [embed] }).catch(() => null);
}
module.exports = { sendLog };
