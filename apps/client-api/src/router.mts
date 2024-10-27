import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { login } from './routes/login.mjs'
import { logout } from './routes/logout.mjs'
import { sessions } from './routes/sessions.mjs'
import { signup } from './routes/signup.mjs'
import { users } from './routes/users.mjs'

export const router = new Hono()

router.get('/', (c) => c.text('OK'))

router.route('/login', login)
router.route('/logout', logout)
router.route('/sessions', sessions)
router.route('/signup', signup)
router.route('/users', users)
