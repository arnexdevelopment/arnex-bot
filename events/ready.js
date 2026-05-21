const { Events, ActivityType } = require('discord.js');
const config = require('../config.json');
module.exports = { name: Events.ClientReady, once: true, execute(client){ console.log(`${client.user.tag} is online.`); client.user.setPresence({ activities: [{ name: `${config.brandName} systems`, type: ActivityType.Watching }], status: 'online' }); } };
