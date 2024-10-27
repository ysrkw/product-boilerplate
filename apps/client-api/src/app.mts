import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

import { router } from './router.mjs'

export const app = new Hono()

app.use(secureHeaders())
app.use(logger())

app.route('/api', router)

app.onError((error) => {
  if (error instanceof HTTPException) return error.getResponse()
  if (error instanceof Error) console.error(error)
  throw new HTTPException(500)
})
