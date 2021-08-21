const fs = require("fs");

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
    const connection = await voiceChannel.join();

    const audioStream = fs.createReadStream(audio);
    const dispatcher = connection.play(audioStream);

    dispatcher.on("start", () => console.log(`Random fact is now playing on server ${serverId}`));
    dispatcher.on("finish", () => {
      console.log(`Random fact has finished playing on server ${serverId}`);
      if (repetition) {
        const getQueue = require("./randomInfoQueue");

        console.log("Enqueued again in ", repetition, " seconds");
        getQueue(serverId).add({ channelId, serverId, repetition }, { delay: repetition * 1000 });
      }
      resolve();
    });

    dispatcher.on("error", (error) => {
      console.error(error);
      reject();
    });
  });
};
