const path = require("path");
const fs = require("fs");
const loadFile = require("../../util/loadFile");
const client = require("../../discord");

module.exports = function playAudio(audioMsg, channelId) {
  return new Promise(async (resolve, reject) => {
    const [_, audio] = audioMsg.split("?");

    const voiceChannel = await client.channels.fetch(channelId);
    if (!voiceChannel) return;

    const currentData = loadFile();
    if (!(audio in currentData)) {
      reject();
    }

    const connection = await voiceChannel.join();

    const audioPath = path.join(__dirname, '..', '..', currentData[audio]);
    const audioStream = fs.createReadStream(audioPath);
    const dispatcher = connection.play(audioStream);

    dispatcher.on('start', () => console.log(`${audioPath} is now playing!`));
    dispatcher.on('finish', () => {
      console.log(`${audioPath} has finished!`);
      resolve();
    });

    dispatcher.on('error', (error) => {
      console.error(error);
      reject();
    });
  });
}