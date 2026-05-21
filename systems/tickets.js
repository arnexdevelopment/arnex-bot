const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');
const storage = require('./storage');
const { sendLog } = require('./logs');
const { createTranscript } = require('./transcript');
function safeName(text){ return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40); }
async function createTicket(interaction, type, extra = {}){
  const guild = interaction.guild;
  const member = interaction.member;
  const staffRoleId = config.roles.staffRoleId;
  const channel = await guild.channels.create({
    name: `ticket-${safeName(member.user.username)}`,
    type: ChannelType.GuildText,
    parent: config.channels.ticketCategoryId.includes('_ID') ? null : config.channels.ticketCategoryId,
    permissionOverwrites: [
      { id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
      { id: member.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles] },
      { id: staffRoleId, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages] }
    ]
  });
  const typeLabel = config.ticketTypes[type] || '📦 Other';
  storage.addTicket({ channelId: channel.id, userId: member.id, type, status: 'open', createdAt: Date.now(), extra });
  const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_close').setLabel('Close Ticket').setEmoji('🔒').setStyle(ButtonStyle.Danger));
  const description = [
    `Client: ${member}`,
    `Type: **${typeLabel}**`,
    extra.service ? `Service: **${extra.service}**` : null,
    extra.budget ? `Budget: **${extra.budget}**` : null,
    extra.deadline ? `Deadline: **${extra.deadline}**` : null,
    '',
    extra.description ? `Description:\n\`\`\`${extra.description.slice(0, 900)}\`\`\`` : 'Staff will help you soon.'
  ].filter(Boolean).join('\n');
  const embed = new EmbedBuilder().setColor(config.embedColor).setTitle(`${typeLabel} Ticket`).setDescription(description).setFooter({ text: config.brandName }).setTimestamp();
  await channel.send({ content: `${member} <@&${staffRoleId}>`, embeds: [embed], components: [row] });
  await sendLog(guild, 'Ticket Created', `${member} created ${channel} (${typeLabel}).`);
  return channel;
}
async function closeTicket(interaction){
  const ticket = storage.getTicket(interaction.channel.id);
  if(!ticket) return interaction.reply({ content: 'This channel is not registered as a ticket.', ephemeral: true });
  await interaction.deferReply({ ephemeral: true });
  storage.updateTicket(interaction.channel.id, { status: 'closed', closedAt: Date.now(), closedBy: interaction.user.id });
  const transcript = await createTranscript(interaction.channel);
  const transcriptId = config.channels.transcriptsChannelId;
  if(transcriptId && !transcriptId.includes('_ID')){
    const transcriptChannel = await interaction.guild.channels.fetch(transcriptId).catch(() => null);
    if(transcriptChannel) await transcriptChannel.send({ content: `Transcript for ${interaction.channel.name}`, files: [transcript] }).catch(() => null);
  }
  await sendLog(interaction.guild, 'Ticket Closed', `${interaction.user} closed ${interaction.channel}.`);
  await interaction.editReply('Ticket closed. Channel will be deleted.');
  setTimeout(() => interaction.channel.delete().catch(() => null), 3000);
}
module.exports = { createTicket, closeTicket };
