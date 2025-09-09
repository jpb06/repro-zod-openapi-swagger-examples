import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { type FastifyInstance, fastify } from 'fastify';
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransformers,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-zod-openapi';
import type { ZodOpenApiVersion } from 'zod-openapi';

import { jobsController } from './routes/jobs/jobs-controller.ts';

const prefix = '/api/v1';

const instance: FastifyInstance = fastify({
  logger: true,
});
instance.setValidatorCompiler(validatorCompiler);
instance.setSerializerCompiler(serializerCompiler);

await instance.register(fastifyZodOpenApiPlugin);
await instance.register(fastifySwagger, {
  swagger: {
    basePath: prefix,
  },
  openapi: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    openapi: '3.1.1' satisfies ZodOpenApiVersion,
  },
  ...fastifyZodOpenApiTransformers,
});
await instance.register(fastifySwaggerUI, {
  routePrefix: `${prefix}/docs`,
});

await instance.register(jobsController, {
  prefix: `${prefix}/jobs`,
});

await instance.listen({
  port: 3000,
  host: '127.0.0.1',
  listenTextResolver: (address: string) =>
    `Application listening at ${address}`,
});
