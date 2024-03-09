import * as joi from '@hapi/joi';

export default joi.object({
  NODE_ENV: joi.required(),
  POSTGRES_HOST: joi.required(),
  POSTGRES_PORT: joi.required(),
  POSTGRES_USER: joi.required(),
  POSTGRES_PASSWORD: joi.required(),
  POSTGRES_DB: joi.required(),
});
