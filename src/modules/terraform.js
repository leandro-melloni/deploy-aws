const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsWithGrep() {
  try {
      const { stdout, stderr } = await exec('ls');
      //console.log('stdout:', stdout);
      //console.log('stderr:', stderr);
      return stdout;
  }catch (err) {
     return err;
  };
}

module.exports = {
    lsWithGrep
};
