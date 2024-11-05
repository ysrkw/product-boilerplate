import { createBrowserRouter } from 'react-router-dom'

import { RootScreen } from './layouts/root-screen'
import * as Dashboard from './routes/dashboard'
import * as Landing from './routes/landing'
import * as Login from './routes/login'
import * as Logout from './routes/logout'
import * as NotFound from './routes/not-found'
import * as PasswordRequest from './routes/password-request'
import * as PasswordRequestComplete from './routes/password-request-complete'
import * as PasswordReset from './routes/password-reset'
import * as PasswordResetComplete from './routes/password-reset-complete'
import * as Signup from './routes/signup'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <Landing.default />,
        index: true,
        loader: Landing.loader,
      },
      {
        action: Login.action,
        element: <Login.default />,
        loader: Login.loader,
        path: 'login',
      },
      {
        loader: Logout.loader,
        path: 'logout',
      },
      {
        action: Signup.action,
        element: <Signup.default />,
        loader: Signup.loader,
        path: 'signup',
      },
      {
        action: PasswordRequest.action,
        element: <PasswordRequest.default />,
        loader: PasswordRequest.loader,
        path: 'passwords/requests',
      },
      {
        element: <PasswordRequestComplete.default />,
        loader: PasswordRequestComplete.loader,
        path: 'passwords/requests/complete',
      },
      {
        action: PasswordReset.action,
        element: <PasswordReset.default />,
        loader: PasswordReset.loader,
        path: 'passwords/resets/:resetId',
      },
      {
        element: <PasswordResetComplete.default />,
        loader: PasswordResetComplete.loader,
        path: 'passwords/resets/:resetId/complete',
      },
      {
        element: <Dashboard.default />,
        loader: Dashboard.loader,
        path: 'dashboard',
      },
      {
        element: <NotFound.default />,
        path: '*',
      },
    ],
    element: <RootScreen />,
    path: '/',
  },
])
