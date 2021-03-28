const getQueue = require("./listenQueue");

function enqueueListen(msg) {
  const channelId = msg.member.voice.channel.id;
  const userId = msg.member.id;
  const serverId = msg.member.voice.channel.guild.id;

  getQueue(serverId).add({ channelId, userId, serverId });
  msg.delete();
}

module.exports = enqueueListen;