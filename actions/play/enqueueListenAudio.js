const audioQueue = require("./audioQueue");
const filterAudios = require("./filterAudios");

function enqueueListenAudio(audios, channelId) {
  const toPlay = filterAudios(audios);
  toPlay.forEach(audio => audioQueue.add({ audio, channelId }));
  console.log(`Enqueued audios: ${toPlay.join(",")}`)
}

module.exports = enqueueListenAudio;