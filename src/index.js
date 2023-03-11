import * as core from '@actions/core';
import * as terraform from './modules/terraform.js';

async function run() {
  try {
    // Get inputs
    const technology = core.getInput('technology', { required: true }).toLowerCase();
    const awsFunction = core.getInput('aws-function', { required: true }).toLowerCase();

    if (technology == 'iac' && awsFunction == 'terraform' || technology == 'iac' &&  awsFunction == 'cloudformation') {
      console.log('Valid configuration, inicitalizing ' + technology + ' with ' + awsFunction);
      if (awsFunction == 'terraform') {
        const response = await terraform.invokeTerraform();
        console.log('Finished ' + technology + ' with ' + awsFunction);
      } else if (awsFunction == 'cloudformation') {
        console.log('Finished ' + technology + ' with ' + awsFunction);
      } else {
        throw new Error('Invalid aws-function input');
      }
    } else {    
        throw new Error('Invalid technology or aws-function input');
    }

    // Get the function name
    // core.setOutput('aws-function', awsFunction);
    console.log("A tecnologia usada e: " + technology);
    console.log("A funcao usada e: " + awsFunction);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();
