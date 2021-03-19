const listenQueue = require("./listenQueue");

function enqueueListen(msg) {
  const channelId = msg.member.voice.channel.id;
  const userId = msg.member.id;
  listenQueue.add({ channelId, userId });
  msg.delete();
}

module.exports = enqueueListen;