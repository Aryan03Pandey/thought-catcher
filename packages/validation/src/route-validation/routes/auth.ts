import { z } from 'zod';
import { userSchema } from '../schema';

const authRouteValidation = {
  "v1/auth/login": {
    response: z.object({
      message: z.string(),
      data: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
        user: userSchema
      })
    }),
    body: z.object({
      token: z.string()
    })
  },
  "v1/auth/refresh": {
    response: z.object({
      message: z.string(),
      data: z.object({
        accessToken: z.string(),
      })
    }),
    body: z.object({
      refreshToken: z.string()
    })
  },
  "v1/auth/logout": {
    response: z.object({
      message: z.string(),
      data: z.object({
        message: z.string()
      })
    }),
    body: z.object({
      refreshToken: z.string()
    })
  },
  "v1/auth/me": {
    response: z.object({
      message: z.string(),
      data: z.object({
        user: userSchema
      })
    })
  },
  "v1/auth/update": {
    response: z.object({
      message: z.string(),
      data: z.object({
        user: userSchema
      })
    }),
    body: z.object({
      newUser: userSchema
    })
  },
  "v1/auth/delete": {
    response: z.object({
      message: z.string(),
      data: z.object({
        message: z.string()
      })
    }),
    body: z.object({
      refreshToken: z.string()
    })
  },
} 

export default authRouteValidation;