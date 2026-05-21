const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
module.exports = { data: new SlashCommandBuilder().setName('services').setDescription('Show available services.'), async execute(interaction){
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('Services').setDescription(['💻 Website Development','🤖 Discord Bot Development','🎮 FiveM Scripts','🎨 UI / NUI Design','🛠️ Bug Fixing','📦 Custom Systems'].join('\n')).setFooter({ text: config.brandName });
  await interaction.reply({ embeds: [embed], ephemeral: true });
}};
