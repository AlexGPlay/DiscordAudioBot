const Queue = require('bull');
const listenQueue = new Queue('listen');
const listenUser = require("./listenUser");

listenQueue.process(job => {
  const { userId, channelId } = job.data;
  return listenUser(userId, channelId);
});

module.exports = listenQueue;