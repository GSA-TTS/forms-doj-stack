# 10x Forms Platform - DOJ Stack

[10x](https://10x.gsa.gov/), in partnership with the Department of Justice (DOJ), is piloting a new managed forms solution, [10x Forms Platform](https://github.com/GSA-TTS/forms).

## Organization

- [server/](./server) - A node.js package that consumes the platform packages, providing custom configuration. This package is run in the deployed environment via a container.

## Technical details

This repository defines a demo cloud configuration for Forms Platform, using DOJ's preferred tech stack. This stack includes:

- [AWS CodeCommit](https://aws.amazon.com/codecommit/) - This repository is provided as a reference for DOJ. Its own internal deployment will be managed via a git repository stored in CodeCommit.
- [AWS CodeBuild](https://aws.amazon.com/codebuild/) - Provides continuous integration.
- [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/) - The CloudFormation configuration in this repository consumes a reusable template provided by the platform.
  - [AWS App Runner](https://aws.amazon.com/apprunner/) - App Runner hosts the Forms Platform node.js web server. App Runner was chosen for its ease of configuration and FedRAMP authorization.
  - [AWS Relational Database Service (RDS)](https://aws.amazon.com/rds/) - RDS hosts the platform's Postgres database.
  - [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) - Secrets storage.

## Management

### Publish image

To publish an image, build and push the docker image to a private ECR repository.

```bash
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
docker tag ${REGISTRY_PATH}:${TAG_NAME} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${TAG_NAME}
```

### Create stack

To create a stack for a deployment environment, specify an environment identifier and the target AWS region:

```bash
npm run forms-apply-stack -r us-gov-east-1 -e dev -i ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${TAG_NAME}
```

You can also publish with a "Hello, world!" image by omitting the image URI:

```bash
npm run forms-apply-stack -r us-gov-east-1 -e dev
```

### Update stack

To update a stack with a new image URI:

```bash
npm run forms-update-stack -r us-gov-east-1 -e dev -i ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${TAG_NAME}
```
