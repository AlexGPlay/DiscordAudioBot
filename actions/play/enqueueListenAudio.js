const audioQueue = require("./audioQueue");

function enqueueListenAudio(audios, channelId) {
  audios.forEach(audio => audioQueue.add({ audio, channelId }));
  console.log(`Enqueued audios: ${audios.join(",")}`)
}

module.exports = enqueueListenAudio;