import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { login } from './login.mjs'
import { logout } from './logout.mjs'
import { register } from './register.mjs'
import { sessions } from './sessions.mjs'
import { users } from './users.mjs'

export const routes = new Hono()

routes.get('/', (c) => c.text('OK'))

routes.route('/login', login)
routes.route('/logout', logout)
routes.route('/register', register)
routes.route('/sessions', sessions)
routes.route('/users', users)

routes.all('*', () => {
  throw new HTTPException(404)
})
