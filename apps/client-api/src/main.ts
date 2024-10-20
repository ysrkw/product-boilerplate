import { serve } from '@hono/node-server'
import { sequelize } from '@repo/sequelize'

import { app } from './app'

sequelize.sync({ force: true })

serve({ fetch: app.fetch, port: 3001 })
