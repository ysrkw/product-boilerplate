import { serve } from '@hono/node-server'

import { app } from './app'
import { sequelize } from './database'

sequelize.sync({ force: true })

serve({ fetch: app.fetch, port: 3001 })
