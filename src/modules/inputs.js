import * as core from '@actions/core';

export async function getInputs() {
    try {
        // Get inputs
        const technology = core.getInput('technology', { required: true }).toLowerCase();
        const awsFunction = core.getInput('aws-function', { required: true }).toLowerCase();
        const awsRegion = core.getInput('aws-region', { required: true }).toLowerCase();
        const terraformCMD = core.getInput('terraform-cmd', { required: false }).toLowerCase();
        const terraformArgs = core.getInput('terraform-args', {required: false }).toLowerCase();
        const cloudformationCMD = core.getInput('cloudformation-cmd', {required: false}).toLowerCase();
        const cloudformationTemplate = core.getInput('cloudformation-template', {required: false}).toLowerCase();
        const cloudformationCustomStackName = core.getInput('cloudformation-custom-stack-name', {required: false}).toLowerCase();
        const cloudformationCustomRoleArn = core.getInput('cloudformation-custom-role-arn', {required: false}).toLowerCase();

        return {
            technology,
            awsFunction,
            awsRegion,
            terraformCMD,
            terraformArgs,
            cloudformationCMD,
            cloudformationTemplate,
            cloudformationCustomStackName,
            cloudformationCustomRoleArn
        };
    } catch (error) {
        core.setFailed(error.message);
    }
}