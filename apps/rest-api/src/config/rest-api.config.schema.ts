import * as joi from '@hapi/joi';

export default joi.object({
  NODE_ENV: joi.required(),
});
