const fs = require("fs");
const Discord = require("discord.js");

const availableIntents = Discord.IntentsBitField.Flags;

const intents = [
  availableIntents.Guilds,
  availableIntents.GuildMessages,
  availableIntents.GuildMessageTyping,
  availableIntents.GuildVoiceStates,
  availableIntents.MessageContent,
];

const client = new Discord.Client({
  intents,
});

const { apiKey } = JSON.parse(fs.readFileSync("./apiKey.json"));
client.login(apiKey);

module.exports = client;
