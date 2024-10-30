import { serve } from '@hono/node-server'

import { app } from './app.mjs'
import { sequelize } from './libs/sequelize.mjs'

await sequelize.sync({ force: true })

serve({ fetch: app.fetch, port: 3001 })
