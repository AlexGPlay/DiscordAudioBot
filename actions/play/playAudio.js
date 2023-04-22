const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const path = require("path");
const loadFile = require("../../util/loadFile");
const client = require("../../discord");

module.exports = function playAudio(audioMsg, channelId, serverId) {
  return new Promise(async (resolve, reject) => {
    const [_, audio] = audioMsg.split("?");

    const voiceChannel = await client.channels.fetch(channelId);
    if (!voiceChannel) return;

    const currentData = loadFile();
    if (!(audio in currentData)) {
      reject();
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const audioPath = path.join(__dirname, "..", "..", currentData[audio]);
    const audioResource = createAudioResource(audioPath);
    const audioPlayer = createAudioPlayer();

    connection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);

    audioPlayer.on("stateChange", (_, newState) => {
      const isFinish = newState.status === AudioPlayerStatus.Idle;
      const isStart = newState.status === AudioPlayerStatus.Playing;

      if (isStart) console.log(`${audio} is now playing on server ${serverId}`);
      if (isFinish) {
        console.log(`${audio} has finished playing on server ${serverId}`);
        resolve();
      }
    });

    audioPlayer.on("error", (error) => {
      console.error(error);
      reject();
    });
  });
};
