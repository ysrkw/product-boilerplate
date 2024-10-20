import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

import { routes } from './routes'

export const app = new Hono()

app.use(secureHeaders())
app.use(logger())

app.route('/', routes)
