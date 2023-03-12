# deploy-aws

Action that supress the complexity to execute commands in AWS, you will only know what command you want and this action will provide your AWS Service or make a deploy in your application.

| variable | required | default | description |
|----------|----------|---------|-------------|
|technology|true      |         |The technology to deploy (e.g. IAC, Serverless, CodeDeploy, etc.)|
|aws-function|true    |         |The AWS function to deploy (e.g. "EC2", "Lambda", "S3", Terraform, CloudFormation, etc.)|
|terraform-cmd|false  | plan    |The Terraform command to run (e.g. "plan", "apply", "destroy", etc.)|
|terraform-args|false | -var-file=terraform.tfvars | The Terraform arguments to pass to the command (e.g. "-var-file=terraform.tfvars")|
|cloudformation-cmd|false | deploy | The CloudFormation command to run (e.g. "deploy", "create", "update", "delete", etc.) |
|cloudformation-args|false|--capabilities CAPABILITY_IAM|The CloudFormation arguments to pass to the command (e.g. "--capabilities CAPABILITY_IAM")|

__Note:__ You will need to install the commands in your workflow to use some technologies, like __terraform__. Bellow an example when use terraform command.

````yml
on:
  push:
    branches:
      - main

jobs:
  deploy-aws:
    runs-on: ubuntu-latest
    steps:
      - name: Install Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install Terraform
        uses: hashicorp/setup-terraform@v1
        with:
          terraform_version: 0.14.7
      - name: Checkout
        uses: actions/checkout@v3
        with:
          path: .github/actions/deploy-aws
      - name: Deploy AWS
        uses: ./.github/actions/deploy-aws
        with:
          technology: 'IAC'
          aws-function: 'Terraform'
          terraform-cmd: 'init'
          terraform-args: ''