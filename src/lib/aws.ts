import aws from 'aws-sdk';

aws.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_DEFAULT_REGION,
    signatureVersion: 'v4',
});

export const S3 = new aws.S3()