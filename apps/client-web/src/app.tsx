import { RouterProvider } from 'react-router-dom'

import { SplashScreen } from './layouts/splash-screen'
import { router } from './router'

export function App() {
  return <RouterProvider fallbackElement={<SplashScreen />} router={router} />
}
