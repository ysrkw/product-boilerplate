import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

export const app = new Hono()

app.use(secureHeaders())
app.use(logger())

app.get('/', (context) => context.text('Hello World'))
