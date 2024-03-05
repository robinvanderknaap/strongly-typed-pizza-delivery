import { registerAs } from '@nestjs/config';

export default registerAs('restApiconfig', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
}));
