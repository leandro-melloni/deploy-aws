const { stderr } = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function invokeTerraform() {
  try {
      const { stdout, stderr } = await exec('terraform init');
      console.log(stdout);
      return stdout;
  }catch (err) {
      throw new Error(err);
      
  };
}

module.exports = {
  invokeTerraform
};
