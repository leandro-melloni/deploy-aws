import * as core from '@actions/core';
import * as inputs from './modules/inputs.js';
import * as terraform from './modules/terraform.js';
import * as cloudformation from './modules/cloudformation.js';

async function run() {
  try {
    // Get inputs
    const { 
      technology, awsFunction, awsRegion, terraformCMD, terraformArgs, cloudformationCMD,
      cloudformationTemplate, cloudformationCustomStackName, cloudformationCustomRoleArn 
    } = await inputs.getInputs();

    if (technology == 'iac' && awsFunction == 'terraform' || technology == 'iac' &&  awsFunction == 'cloudformation') {
      console.log('Valid configuration, inicitalizing ' + technology + ' with ' + awsFunction);
      if (awsFunction == 'terraform') {
        await terraform.invokeTerraform(terraformCMD, terraformArgs);
        console.log('Finished ' + technology + ' with ' + awsFunction);
      } else if (awsFunction == 'cloudformation') {
        let stackName;
        let roleARN;

        if ( cloudformationCustomStackName == '') {
          stackName = core.getInput('GITHUB_REPOSITORY').replace('/', '-');
        } else {
          stackName = cloudformationCustomStackName;
        }
        if (cloudformationCustomRoleArn == '') {
          roleARN = 'arn:aws:iam::' + core.getInput('AWS_ACCOUNT_ID') + ':role/' + core.getInput('AWS_ROLE_NAME');
        } else {
          roleARN = cloudformationCustomRoleArn;
        }
        await cloudformation.activateType(
          awsRegion, stackName, cloudformationCMD, cloudformationTemplate, roleARN
        );
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
