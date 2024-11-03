import { Link, LoaderFunctionArgs, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader({ request }: LoaderFunctionArgs) {
  const sessions = await api
    .get('sessions', { signal: request.signal })
    .json<{ ok: boolean }>()

  if (!sessions.ok) throw redirect('/')

  return {}
}

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/logout">ログアウト</Link>
    </>
  )
}
