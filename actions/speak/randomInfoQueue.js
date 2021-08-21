const Queue = require("bull");
const playRandomFact = require("./playRandomFact");

const queues = {};

module.exports = function getQueue(serverId) {
  if (queues[serverId]) return queues[serverId];

  const randomInfoQueue = new Queue(`randomInfo-${serverId}`);

  randomInfoQueue.process((job) => {
    const { channelId, serverId, repetition } = job.data;
    return playRandomFact(channelId, serverId, repetition);
  });

  queues[serverId] = randomInfoQueue;

  return randomInfoQueue;
};
