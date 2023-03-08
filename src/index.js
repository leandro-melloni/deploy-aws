const core = require('@actions/core');

async function run() {
  try {
    // Get inputs
    const technology = core.getInput('technology', { required: true });
    const awsFunction = core.getInput('aws-function', { required: true });

    // Get the function name
    core.setOutput('aws-function', awsFunction);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run();