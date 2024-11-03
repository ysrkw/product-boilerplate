import { RouterProvider } from 'react-router-dom'

import { Loader } from './components/loading'
import { router } from './router'

export function App() {
  return <RouterProvider fallbackElement={<Loader />} router={router} />
}
