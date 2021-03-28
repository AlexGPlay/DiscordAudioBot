const getAudioQueue = require("./audioQueue");
const filterAudios = require("./filterAudios");

function enqueueListenAudio(audios, channelId, serverId) {
  const toPlay = filterAudios(audios);
  const audioQueue = getAudioQueue(serverId);

  toPlay.forEach(audio => audioQueue.add({ audio, channelId, serverId }));
  console.log(`Enqueued audios for server ${serverId}: ${toPlay.join(",")}`);
}

module.exports = enqueueListenAudio;