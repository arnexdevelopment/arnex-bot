const { Events } = require('discord.js');
const { sendLog } = require('../systems/logs');
module.exports = { name: Events.GuildMemberAdd, async execute(member){ await sendLog(member.guild, 'Member Joined', `${member.user.tag} joined the server.`); } };
