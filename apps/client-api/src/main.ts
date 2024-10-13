import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

const app = new Hono()

app.use(secureHeaders())
app.use(logger())

app.get('/', (context) => context.text('Hello World'))

serve({ fetch: app.fetch, port: 3001 })
