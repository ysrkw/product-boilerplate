import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { login } from './login'
import { register } from './register'
import { sessions } from './sessions'
import { users } from './users'

export const routes = new Hono()

routes.get('/', (c) => c.text('OK'))

routes.route('/login', login)
routes.route('/register', register)
routes.route('/sessions', sessions)
routes.route('/users', users)

routes.all('*', () => {
  throw new HTTPException(404)
})
