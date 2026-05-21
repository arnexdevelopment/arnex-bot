const { AttachmentBuilder } = require('discord.js');
async function createTranscript(channel){
  const messages = await channel.messages.fetch({ limit: 100 });
  const sorted = [...messages.values()].sort((a,b) => a.createdTimestamp - b.createdTimestamp);
  const content = sorted.map(m => `[${new Date(m.createdTimestamp).toISOString()}] ${m.author.tag}: ${m.content || '[Embed/Attachment]'}`).join('\n');
  return new AttachmentBuilder(Buffer.from(content || 'No messages found.', 'utf8'), { name: `transcript-${channel.name}.txt` });
}
module.exports = { createTranscript };
