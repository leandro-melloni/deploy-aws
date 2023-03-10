const util = require('util');
const exec = util.promisify(require('child_process').exec);

function lsWithGrep() {
  try {
      const { stdout, stderr } = exec('ls | grep js');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      return;
  }catch (err) {
     return err;
  };
}

module.exports = {
    lsWithGrep
};
