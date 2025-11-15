import { z } from 'zod';
import { tagSchema } from '../schema'

const tagsRouteValidation = {
  "v1/tags": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: z.array(tagSchema)
      })
    })
  },
  "v1/tags/:id.delete": {
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
  "v1/tags/create": {
    response: z.object({
      message: z.string(),
      data: z.object({
        data: tagSchema
      })
    }),
    body: z.object({
      name: z.string().min(2).max(100),
    })
  },
}

export default tagsRouteValidation;