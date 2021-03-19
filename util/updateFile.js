const fs = require("fs");

module.exports = function updateFile(newContent){
  fs.writeFileSync("./files.json", JSON.stringify(newContent));
}