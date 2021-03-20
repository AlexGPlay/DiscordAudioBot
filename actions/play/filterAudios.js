const loadFile = require("../../util/loadFile");

module.exports = function filterAudios(audios) {
  const savedAudios = Object.keys(loadFile());
  return audios.filter(audio => savedAudios.includes(audio.split("?")[1]));
}