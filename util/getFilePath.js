const path = require("path");

module.exports = function getFilePath(file) {
  return path.resolve(__dirname, "..", file);
};
