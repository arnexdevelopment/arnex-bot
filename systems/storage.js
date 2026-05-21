const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'tickets.json');
function ensureFile(){ if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({tickets:[]}, null, 2)); }
function readData(){ ensureFile(); return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
function writeData(data){ fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); }
function addTicket(ticket){ const data = readData(); data.tickets.push(ticket); writeData(data); }
function updateTicket(channelId, update){ const data = readData(); const ticket = data.tickets.find(t => t.channelId === channelId); if(!ticket) return null; Object.assign(ticket, update); writeData(data); return ticket; }
function getTicket(channelId){ return readData().tickets.find(t => t.channelId === channelId) || null; }
module.exports = { readData, writeData, addTicket, updateTicket, getTicket };
