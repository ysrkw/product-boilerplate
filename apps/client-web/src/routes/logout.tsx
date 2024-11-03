import { LoaderFunctionArgs, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader({ request }: LoaderFunctionArgs) {
  await api.post('logout', { signal: request.signal }).json()

  throw redirect('/')
}
