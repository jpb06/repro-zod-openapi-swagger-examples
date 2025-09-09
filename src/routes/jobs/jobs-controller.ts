import type { FastifyInstance, FastifyRegisterOptions } from 'fastify';

import { injectPostJobsRoute } from './post/route.ts';

export const jobsController = (
  fastifyInstance: FastifyInstance,
  _options: FastifyRegisterOptions<unknown>,
  done: (error?: Error) => void,
): void => {
  injectPostJobsRoute(fastifyInstance);

  done();
};
