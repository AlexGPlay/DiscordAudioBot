const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();

const { apiKey } = JSON.parse(fs.readFileSync("./apiKey.json"));
client.login(apiKey);

module.exports = client;