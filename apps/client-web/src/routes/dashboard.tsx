import { Link, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader() {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

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
