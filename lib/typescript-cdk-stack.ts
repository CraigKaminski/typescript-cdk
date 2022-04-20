import { Stack, StackProps, CfnOutput, Tags, aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Networking } from './networking';

export class TypescriptCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'DocumentsBucket', {
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    new CfnOutput(this, 'DocumentsBucketNameExport', {
      exportName: 'DocumentsBucketName',
      value: bucket.bucketName
    });

    const networkingStrack = new Networking(this, 'NetworkingConstruct', {
      maxAzs: 2
    });

    Tags.of(networkingStrack).add('Module', 'Networking');
  }
}
