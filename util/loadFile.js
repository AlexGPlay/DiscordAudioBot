const fs = require("fs");

module.exports = function loadFile(){
  try{
    const file = fs.readFileSync("./files.json");
    return JSON.parse(file);
  }
  catch(e){
    console.error(e);
    return {};
  }
}