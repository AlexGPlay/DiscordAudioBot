const enqueueAudio = require("./actions/play/enqueueAudio");
const uploadAudio = require('./actions/uploadAudio');
const removeAudio = require('./actions/removeAudio');
const listAudios = require('./actions/listAudios');

const client = require("./discord");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("memes", { type: "LISTENING" });
});

client.on('message', async msg => {
  if (msg.content.startsWith('?upload')) uploadAudio(msg);
  else if (msg.content.startsWith('?remove')) removeAudio(msg);
  else if (msg.content.startsWith('?list')) listAudios(msg);
  else if (msg.content.startsWith('?')) enqueueAudio(msg);
});