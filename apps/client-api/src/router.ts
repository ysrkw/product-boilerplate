import { Hono } from 'hono'

import { login } from './routes/login'
import { logout } from './routes/logout'
import { passwordRequests } from './routes/password-requests'
import { passwordResets } from './routes/password-resets'
import { sessions } from './routes/sessions'
import { signup } from './routes/signup'
import { users } from './routes/users'

export const router = new Hono()

router.get('/', (c) => c.text('OK'))

router.route('/login', login)
router.route('/logout', logout)
router.route('/passwords/requests', passwordRequests)
router.route('/passwords/resets', passwordResets)
router.route('/sessions', sessions)
router.route('/signup', signup)
router.route('/users', users)
