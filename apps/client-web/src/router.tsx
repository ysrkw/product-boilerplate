import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './routes/dashboard'
import { Landing } from './routes/landing'
import { Login } from './routes/login'
import * as Logout from './routes/logout'
import { NotFound } from './routes/not-found'
import * as Signup from './routes/signup'

export const router = createBrowserRouter([
  { element: <Landing />, path: '/' },
  { element: <Login />, path: '/login' },
  { loader: Logout.loader, path: '/logout' },
  { action: Signup.action, element: <Signup.default />, path: '/signup' },
  { element: <Dashboard />, path: '/dashboard' },
  { element: <NotFound />, path: '*' },
])
