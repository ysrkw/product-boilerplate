import { Hono } from 'hono'

import { users } from './users'

export const routes = new Hono()

routes.get('/', (context) => context.text('OK'))

routes.route('/users', users)
