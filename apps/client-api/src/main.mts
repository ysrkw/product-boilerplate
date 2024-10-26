import { serve } from '@hono/node-server'

import { app } from './app.mjs'
import { sequelize } from './database.mjs'

sequelize.sync({ force: true })

serve({ fetch: app.fetch, port: 3001 })
