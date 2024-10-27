import { serve } from '@hono/node-server'

import { app } from './app.mjs'
import { sequelize } from './database.mjs'

await sequelize.sync({ force: true })

serve({ fetch: app.fetch, port: 3001 })