import { redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader() {
  await api.post('logout').json()

  throw redirect('/')
}
