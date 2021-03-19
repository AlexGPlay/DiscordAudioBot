/**
 * If you already have audios and don't want to upload them one by one, you can put them inside de audios folder
 * and launch this script, a files.json audio will be generated with the audios inside the folder.
 */
const fs = require('fs');

const result = {};
const names = fs.readdirSync('./audios');
names.forEach(e => {
  const name = e.split(".")[0];
  result[name] = `./audios/${e}`;
});

fs.writeFileSync('files.json', JSON.stringify(result));