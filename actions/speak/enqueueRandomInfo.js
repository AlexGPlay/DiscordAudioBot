const getQueue = require("./randomInfoQueue");

function enqueueRandomInfo(msg, opts) {
  const channelId = msg.member.voice.channel.id;
  const serverId = msg.member.voice.channel.guild.id;
  const repetition = msg.content.split(" ")[1] || null;

  if (repetition && repetition.trim() === "clear") {
    console.log("Queue has been cleared");
    getQueue(serverId).empty();
  } else {
    getQueue(serverId).add({ channelId, serverId, repetition }, opts);
  }
  msg.delete();
}

module.exports = enqueueRandomInfo;
