const Queue = require('bull');
const listenUser = require("./listenUser");

const queues = {};

module.exports = function getQueue(serverId) {
  if (queues[serverId]) return queues[serverId];

  const listenQueue = new Queue(`listen-${serverId}`);

  listenQueue.process(job => {
    const { userId, channelId, serverId } = job.data;
    return listenUser(userId, channelId, serverId);
  });

  queues[serverId] = listenQueue;

  return listenQueue;
}