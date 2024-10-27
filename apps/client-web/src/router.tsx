import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './routes/dashboard'
import { Landing } from './routes/landing'
import { Login } from './routes/login'
import { Logout } from './routes/logout'
import { NotFound } from './routes/not-found'
import { actionSignup, Signup } from './routes/signup'

export const router = createBrowserRouter([
  { element: <Landing />, path: '/' },
  { element: <Login />, path: '/login' },
  { element: <Logout />, path: '/logout' },
  { element: <Signup />, path: '/signup' },
  { element: <Dashboard />, path: '/dashboard' },
  { action: actionSignup, element: <NotFound />, path: '*' },
])
