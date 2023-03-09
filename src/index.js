const core = require('@actions/core');

async function run() {
  try {
    // Get inputs
    let technology = core.getInput('technology', { required: true }).toLowerCase();
    let awsFunction = core.getInput('aws-function', { required: true }).toLowerCase();

    if (technology == 'iac' && awsFunction == 'terraform' || technology == 'iac' && awsFunction == 'cloudformation') {
      console.log('Valid technology and aws-function inputs'); 
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
