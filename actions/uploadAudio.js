const fs = require("fs");
const https = require("https");
const loadFile = require("../util/loadFile");
const updateFile = require("../util/updateFile");

module.exports = async function uploadAudio(msg){
  const name = msg.content.split(" ")[1];

  const attachments = msg.attachments;
  if(attachments.array().length === 0) return;
  const msgAttachment = attachments.first();
  const fileName = msgAttachment.name;
  const extension = fileName.split(".")[1];
  const newFileName = `./audios/${new Date().getTime()}.${extension}`;

  const currentData = loadFile();
  if(name in currentData){
    const error = "Ya existe una entrada con ese nombre";
    msg.reply(error);
    console.error(error);
    msg.delete();
    return;
  }

  const writerStream = fs.createWriteStream(newFileName);
  https.get(msgAttachment.attachment, res => {
    res.pipe(writerStream);
    writerStream.on('finish', () => {
      currentData[name] = newFileName;
      updateFile(currentData);
      const success = `Se ha creado una entrada con el nombre ${name}`;
      msg.reply(success);
      console.error(success);
      msg.delete();
    });
  });
}