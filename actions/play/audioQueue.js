const Queue = require('bull');
const playAudio = require("./playAudio");

const queues = {};

module.exports = function getQueue(serverId) {
  if (queues[serverId]) return queues[serverId];

  const audioQueue = new Queue(`audios-${serverId}`);

  audioQueue.process(job => {
    const { audio, channelId, serverId } = job.data;
    return playAudio(audio, channelId, serverId);
  });

  queues[serverId] = audioQueue;

  return audioQueue;
}