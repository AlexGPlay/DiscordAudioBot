const loadFile = require("../util/loadFile");

module.exports = function listAudios(msg) {
  const file = loadFile();
  const entries = Object.keys(file).sort();
  const replyMsg = `Existen las siguientes entradas:\n${entries.join("\t")}`;
  msg.reply(replyMsg);
};
