import { createBrowserRouter } from 'react-router-dom'

import * as Dashboard from './routes/dashboard'
import * as Landing from './routes/landing'
import * as Login from './routes/login'
import * as Logout from './routes/logout'
import * as NotFound from './routes/not-found'
import * as Signup from './routes/signup'

export const router = createBrowserRouter([
  {
    element: <Landing.default />,
    loader: Landing.loader,
    path: '/',
  },
  {
    action: Login.action,
    element: <Login.default />,
    loader: Login.loader,
    path: '/login',
  },
  {
    loader: Logout.loader,
    path: '/logout',
  },
  {
    action: Signup.action,
    element: <Signup.default />,
    loader: Signup.loader,
    path: '/signup',
  },
  {
    element: <Dashboard.default />,
    loader: Dashboard.loader,
    path: '/dashboard',
  },
  {
    element: <NotFound.default />,
    path: '*',
  },
])
