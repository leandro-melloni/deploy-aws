const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsWithGrep(awsFunction) {
  try {
      const test = awsFunction;
      //const { stdout, stderr } = await exec('ls | grep js');
      //console.log('stdout:', stdout);
      //console.log('stderr:', stderr);
      return test;
  }catch (err) {
     return err;
  };
}

module.exports = {
    lsWithGrep
};
