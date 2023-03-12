import * as core from '@actions/core';

export async function getInpus(){
    const technology = core.getInput('technology', { required: true }).toLowerCase();
    const awsFunction = core.getInput('aws-function', { required: true }).toLowerCase();
    const awsRegion = core.getInput('aws-region', { required: true }).toLowerCase();
    const terraformCMD = core.getInput('terraform-cmd').toLowerCase();
    const terraformArgs = core.getInput('terraform-args').toLowerCase();

    return {
        technology,
        awsFunction,
        awsRegion,
        terraformCMD,
        terraformArgs
    }
}