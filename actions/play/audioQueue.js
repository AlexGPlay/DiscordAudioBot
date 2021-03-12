const Queue = require('bull');
const audioQueue = new Queue('audios');
const playAudio = require("./playAudio");

audioQueue.process(job => {
  const { audio, channelId } = job.data;
  return playAudio(audio, channelId);
});

module.exports = audioQueue;