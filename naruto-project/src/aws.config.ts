import {ResourcesConfig} from "aws-amplify";

const AWS_CONFIGURATION: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'sa-east-1_Etdpagyf1',
      userPoolClientId: 'g3ajfujdejtvrh4f0g97i9tp4',
      identityPoolId: 'sa-east-1:cec5e2fa-09f1-464e-9d53-370ff0994c9b',
    }
  },
  Storage: {
    S3: {
      bucket: 'onepiece-files',
      region: 'sa-east-1',
    }
  }
};

export default AWS_CONFIGURATION;
