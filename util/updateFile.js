const fs = require("fs");
const getFilePath = require("./getFilePath");

module.exports = function updateFile(newContent) {
  const filePath = getFilePath("./files.json");
  fs.writeFileSync(filePath, JSON.stringify(newContent));
};
