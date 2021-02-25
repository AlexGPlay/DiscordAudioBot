const path = require("path");
const fs = require("fs");
const loadFile = require("../util/loadFile");

module.exports = async function playAudio(msg){
  const [_, audio] = msg.content.split(" ");
    
  const voiceChannel = msg.member.voice.channel;
  if(!voiceChannel) return;

  const currentData = loadFile();
  if(!(audio in currentData)){
    msg.reply(`No existe ninguna entrada con el nombre ${audio}`);
    return;
  }

  const connection = await voiceChannel.join();
  
  const audioPath = path.join(__dirname, '..', currentData[audio]);
  const audioStream = fs.createReadStream(audioPath);
  const dispatcher = connection.play(audioStream);
  
  dispatcher.on('start', () => console.log(`${audioPath} is now playing!`));
  dispatcher.on('finish', () => {
    console.log(`${audioPath} has finished!`);
    connection.disconnect();
  });

  dispatcher.on('error', console.error);
}