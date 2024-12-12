import { serve } from '@hono/node-server'

import { app } from './app'
import { scheduler } from './libs/bullmq'
import { sequelize } from './libs/sequelize'

sequelize.sync()

scheduler()

serve({ fetch: app.fetch, port: 3001 })
