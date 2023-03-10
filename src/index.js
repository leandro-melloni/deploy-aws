const core = require('@actions/core');
const terraform = require('./modules/terraform.js');

async function run() {
  try {
    // Get inputs
    const technology = core.getInput('technology', { required: true }).toLowerCase();
    const awsFunction = core.getInput('aws-function', { required: true }).toLowerCase();

    if (technology == 'iac' && awsFunction == 'terraform' || technology == 'iac' &&  awsFunction == 'cloudformation') {
      console.log('Valid configuration, inicitalizing ' + technology + ' with ' + awsFunction);
      const response = await terraform.lsWithGrep();
      console.log(response);
      console.log('Finished ' + technology + ' with ' + awsFunction);
    } else {    
        throw new Error('Invalid technology or aws-function input');
    }

    // Get the function name
    core.setOutput('aws-function', awsFunction);
    console.log("A tecnologia usada e: " + technology);
    console.log("A funcao usada e: " + awsFunction);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
