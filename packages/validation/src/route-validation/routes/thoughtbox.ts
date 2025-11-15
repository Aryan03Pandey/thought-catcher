import { z } from 'zod';
import { thoughtBoxSchema } from '../schema';

const thoughtboxRouteValidation = {
  "v1/thoughtbox": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: z.array(thoughtBoxSchema)
      })
    })
  },
  "v1/thoughtbox/:id.get": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: thoughtBoxSchema
      })
    }),
    params: z.object({
      id: z.string().uuid()
    })
  },
  "v1/thoughtbox/:id.delete": {
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
  "v1/thoughtbox/create": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: thoughtBoxSchema
      })
    }),
    body: z.object({
      name: z.string().min(2).max(100),
      color: z.string().min(2).max(100)
    })
  },
  
}

export default thoughtboxRouteValidation;