import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { sessions } from './sessions'
import { users } from './users'

export const routes = new Hono()

routes.get('/', (c) => c.text('OK'))

routes.route('/sessions', sessions)
routes.route('/users', users)

routes.all('*', () => {
  throw new HTTPException(404)
})
