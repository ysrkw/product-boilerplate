import { serve } from '@hono/node-server'

import { app } from './app'
import { sequelize } from './libs/sequelize'

sequelize.sync()

serve({ fetch: app.fetch, port: 3001 })
