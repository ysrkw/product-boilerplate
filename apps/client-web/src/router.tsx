import { createBrowserRouter } from 'react-router-dom'

import * as Dashboard from './routes/dashboard'
import * as Landing from './routes/landing'
import * as Login from './routes/login'
import * as Logout from './routes/logout'
import * as NotFound from './routes/not-found'
import * as Signup from './routes/signup'

export const router = createBrowserRouter([
  { element: <Landing.default />, path: '/' },
  { action: Login.action, element: <Login.default />, path: '/login' },
  { loader: Logout.loader, path: '/logout' },
  { action: Signup.action, element: <Signup.default />, path: '/signup' },
  { element: <Dashboard.default />, path: '/dashboard' },
  { element: <NotFound.default />, path: '*' },
])
