import * as aws from "aws-sdk";
import * as path from 'path'
import * as fs from 'fs'
import {
    isUrl,
} from './utils.js'

export async function activateType(awsRegion, stackName, template, roleARN, cloudformationCMD) {
    try {
        const clientConfiguration = {
            customUserAgent: 'aws-cloudformation-github-deploy-for-github-actions'
        };
        const cloudformation = new aws.CloudFormation({ region: awsRegion, ...clientConfiguration });
        const { GITHUB_WORKSPACE = __dirname } = process.env;

        let templateBody;
        let templateUrl;

        if (isUrl(template)) {
            console.log('Using CloudFormation Stack from Amazon S3 Bucket');
            templateUrl = template;
        } else {
            console.log('Loading CloudFormation Stack template');
            const templateFilePath = path.isAbsolute(template)
              ? template
              : path.join(GITHUB_WORKSPACE, template);
            templateBody = fs.readFileSync(templateFilePath, 'utf8');
        }

        const params = {
            StackName: stackName,
            RoleARN: roleARN,
            TemplateBody: templateBody,
            TemplateURL: templateUrl
        };

        if (cloudformationCMD == 'deploy') {
            const stackId = await deployStack(
                cloudformation,
                params
            )
            core.setOutput('stack-id', stackId || 'UNKNOWN')
        } else if (cloudformationCMD == 'delete') {
            const stackId = await deleteStack(
                cloudformation,
                params
            )
            core.setOutput('stack-id', stackId || 'UNKNOWN')
        } else if (cloudformationCMD == 'update') {
            const stackId = await updateStack(
                cloudformation,
                params
            )
            core.setOutput('stack-id', stackId || 'UNKNOWN')
        } else {
            throw new Error('Invalid cloudformationCMD input');
        }


    } catch (err) {
        throw new Error(err);
    }
}

async function getStack(
    cloudformation,
    stackName
  ) {
    try {
      const stacks = await cloudformation
        .describeStacks({
          StackName: stackName
        })
        .promise();
      return stacks.Stacks[0];
    } catch (e) {
      if (e.code === 'ValidationError' && e.message.match(/does not exist/)) {
        return undefined;
      }
      throw e;
    }
  }

export async function deployStack(
    cloudformation,
    params,
  ) {
    const stack = await getStack(cloudformation, params.StackName);
  
    if (!stack) {
      console.log(`Creating CloudFormation Stack`);
  
      const stack = await cloudformation.createStack(params).promise();
      await cloudformation
        .waitFor('stackCreateComplete', { StackName: params.StackName })
        .promise();
  
      return stack.StackId;
    }
}

export async function deleteStack(
    cloudformation,
    params,
  ) {
    const stack = await getStack(cloudformation, params.StackName);
  
    if (stack) {
      console.log(`Deleting CloudFormation Stack`);
  
      const stack = await cloudformation.deleteStack(params).promise();
      await cloudformation
        .waitFor('stackDeleteComplete', { StackName: params.StackName })
        .promise();
  
      return stack.StackId;
    } else {
        console.log(`Stack not found`);
    }
}

export async function updateStack(
    cloudformation,
    params,
  ) {
    const stack = await getStack(cloudformation, params.StackName);
  
    if (stack) {
      console.log(`Updating CloudFormation Stack`);
  
      const stack = await cloudformation.updateStack(params).promise();
      await cloudformation
        .waitFor('stackUpdateComplete', { StackName: params.StackName })
        .promise();
  
      return stack.StackId;
    } else {
        console.log(`Stack not found`);
    }
}