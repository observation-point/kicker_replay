const tmpdir = require('os').tmpdir; 

module.exports = {
  "recordsTemp": `${tmpdir}/kicker_replays_temp`,
  "recordsPath": `${tmpdir}/kicker_replays`
};
