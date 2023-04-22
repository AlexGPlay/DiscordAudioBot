const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const client = require("../../discord");
const obtainRandomFact = require("../../util/obtainRandomFact");
const translateTextToSpeech = require("./translateTextToSpeech");

module.exports = (channelId, serverId, repetition) => {
  return new Promise(async (resolve, reject) => {
    const fact = await obtainRandomFact();
    const { success, audio, error } = await translateTextToSpeech(fact.content);
    if (!success) {
      console.log("Azure Error", error);
      return;
    }

    const voiceChannel = await client.channels.fetch(channelId);

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    const audioResource = createAudioResource(audio);
    const audioPlayer = createAudioPlayer();

    connection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);

    audioPlayer.on("stateChange", (_, newState) => {
      const isFinish = newState.status === AudioPlayerStatus.Idle;
      const isStart = newState.status === AudioPlayerStatus.Playing;

      if (isStart) console.log(`${audio} is now playing on server ${serverId}`);
      if (isFinish) {
        if (repetition) {
          const getQueue = require("./randomInfoQueue");

          console.log("Enqueued again in ", repetition, " seconds");
          getQueue(serverId).add(
            { channelId, serverId, repetition },
            { delay: repetition * 1000 }
          );
        }
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
