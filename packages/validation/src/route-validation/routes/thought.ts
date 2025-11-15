import { z } from 'zod';
import { thoughtSchema, thoughtSchemaPopulated } from '../schema';

const thoughtRouteValidation = {
  "v1/thought": {
    response: z.object({
      data: z.object({
        message: z.string(),
        data: z.object({
          data: z.array(thoughtSchemaPopulated),
          pagination: z.object({
            total: z.number(),
            limit: z.number(),
            page: z.number(),
            totalPages: z.number()
          })
        })
      })
    }),
    query: z.object({
      limit: z.string().min(1).max(100).default('10'),
      page: z.string().min(1).max(100).default('1')
    })
  },
  "v1/thought/:id.get": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: thoughtSchemaPopulated
      })
    }),
    params: z.object({
      id: z.string().uuid()
    }),
    
  },
  "v1/thought/:id.delete": {
    response: z.object({
      message: z.string(),
      data: z.object({
        message: z.string()
      })
    }),
    params: z.object({
      id: z.string().uuid()
    })
  },
  "v1/thought/create": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: thoughtSchema
      })
    }),
    body: z.object({
      text: z.string().min(1).max(1000),
      thoughtBoxId: z.string().uuid(),
      tags: z.array(z.string().uuid())
    })
  },
  
}

export default thoughtRouteValidation;