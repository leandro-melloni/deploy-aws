const { stderr } = require('process');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function invokeTerraform(terraformCMD, terraformArgs) {
  try {
      if ( terraformCMD == 'init' ) {
        const { stdout, stderr } = await exec('terraform ' + terraformCMD);
      } else {
        const { stdout, stderr } = await exec('terraform ' + terraformCMD + ' ' + terraformArgs);
      }
      console.log(stdout);
      return response;
  }catch (err) {
      throw new Error(err);
  };
}

module.exports = {
  invokeTerraform
};
