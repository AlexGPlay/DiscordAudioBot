const fs = require("fs");
const getFilePath = require("./getFilePath");

module.exports = function loadFile() {
  try {
    const filePath = getFilePath("./files.json");
    const file = fs.readFileSync(filePath);
    return JSON.parse(file);
  } catch (e) {
    console.error(e);
    return {};
  }
};
