const fs = require("fs");
const loadFile = require("../util/loadFile");
const updateFile = require("../util/updateFile");

module.exports = function removeAudio(msg){
  const audio = msg.content.split(" ")[1];
  const entries = loadFile();
  if(!(audio in entries)){
    const msgText = `No existe la entrada ${audio}`;
    console.log(msgText);
    msg.reply(msgText);
    msg.delete();
    return;
  }

  const file = entries[audio];
  fs.unlinkSync(file);
  delete entries[audio];
  updateFile(entries);
  
  const msgText = `Se ha eliminado la entrada con nombre ${audio}`;
  console.log(msgText);
  msg.reply(msgText);
  msg.delete();
}