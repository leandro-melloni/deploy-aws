const { stderr } = require('process');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function invokeTerraform(terraformCMD, terraformArgs) {
  try {
      const { stdout, stderr } = await exec('terraform init');
      console.log(stdout);
      const response = await commandTerraform(terraformCMD, terraformArgs);
      return response;
  }catch (err) {
      throw new Error(err);
  };
}

async function commandTerraform(terraformCMD, terraformArgs) {
  try {
    const { stdout, stderr } = await exec('terraform ' + terraformCMD + terraformArgs);
    console.log(stdout);
    return stdout;
  }catch (err) {
      throw new Error(err);
  };
}

module.exports = {
  invokeTerraform
};
