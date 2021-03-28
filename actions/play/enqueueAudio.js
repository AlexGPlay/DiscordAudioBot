const getQueue = require("./audioQueue");
const filterAudios = require("./filterAudios");

function enqueueAudio(audioMsg) {
  const audios = filterAudios(audioMsg.content.split(" "));
  const channelId = audioMsg.member.voice.channel.id;
  const serverId = audioMsg.member.voice.channel.guild.id;

  const audioQueue = getQueue(serverId);

  audios.forEach(audio => {
    audioQueue.add({ audio, channelId, serverId });
  });

  console.log(`Enqueued audios for server ${serverId}: ${audios.join(",")}`)
  audioMsg.delete();
}

module.exports = enqueueAudio;