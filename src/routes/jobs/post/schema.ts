import z from 'zod';

export const postJobsBodySchema = z
  .object({
    jobId: z.string(),
  })
  .meta({
    // id: 'PostJobsBody',
    // description: 'post jobs body',
    examples: [{ jobId: 'fromage' }, { jobId: 'saucisse' }],
  });

export const postJobsResponseSchema = z.object({
  jobId: z.string().meta({
    description: 'Job ID',
    example: '60002023',
  }),
});
