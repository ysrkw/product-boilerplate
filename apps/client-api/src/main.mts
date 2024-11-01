import { serve } from '@hono/node-server'

import { app } from './app.mjs'
import { sequelize } from './libs/sequelize.mjs'

await sequelize.sync()

serve({ fetch: app.fetch, port: 3001 })
