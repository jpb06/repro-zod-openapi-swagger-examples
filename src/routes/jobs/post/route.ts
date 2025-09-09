import type { FastifyInstance } from 'fastify';
import type {
  FastifyZodOpenApiSchema,
  FastifyZodOpenApiTypeProvider,
} from 'fastify-zod-openapi';

import { postJobsBodySchema, postJobsResponseSchema } from './schema.ts';

export const injectPostJobsRoute = (instance: FastifyInstance) => {
  instance.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: postJobsBodySchema,
      response: {
        201: postJobsResponseSchema,
      },
    } satisfies FastifyZodOpenApiSchema,
    handler: async (req, res) => {
      await res.send({ jobId: req.body.jobId });
    },
  });
};
