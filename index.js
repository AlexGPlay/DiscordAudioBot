const playAudio = require('./actions/playAudio');
const uploadAudio = require('./actions/uploadAudio');
const removeAudio = require('./actions/removeAudio');
const listAudios = require('./actions/listAudios');

const fs = require("fs");

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content.startsWith('?play')) playAudio(msg);
  else if(msg.content.startsWith('?upload')) uploadAudio(msg);
  else if(msg.content.startsWith('?remove')) removeAudio(msg);
  else if(msg.content.startsWith('?list')) listAudios(msg);
});

const { apiKey } = JSON.parse(fs.readFileSync("./apiKey.json"));
client.login(apiKey);