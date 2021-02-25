const loadFile = require("../util/loadFile")

module.exports = function listAudios(msg){
  const file = loadFile();
  const entries = Object.keys(file).map(e => `- ${e}`).join("\n");
  const replyMsg = `Existen las siguientes entradas:\n${entries}`;
  msg.reply(replyMsg);
}