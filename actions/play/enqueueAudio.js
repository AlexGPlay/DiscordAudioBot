const audioQueue = require("./audioQueue");
const filterAudios = require("./filterAudios");

function enqueueAudio(audioMsg) {
  const audios = filterAudios(audioMsg.content.split(" "));
  const channelId = audioMsg.member.voice.channel.id;

  audios.forEach(audio => {
    audioQueue.add({ audio, channelId });
  });

  console.log(`Enqueued audios: ${audios.join(",")}`)
  audioMsg.delete();
}

module.exports = enqueueAudio;