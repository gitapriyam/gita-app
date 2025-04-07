const chapterAudio = require('./src/functions/chapterAudio');
const chapterResource = require('./src/functions/chapterResource');
const chapters = require('./src/functions/chapters');
const sloka = require('./src/functions/sloka');
const slokaAudio = require('./src/functions/slokaAudio');
const slokaGroups = require('./src/functions/slokaGroups');
const utils = require('./src/functions/utils'); 

module.exports = {
  utils, 
  chapterAudio,
  chapterResource,
  chapters,
  sloka,
  slokaAudio,
  slokaGroups
};