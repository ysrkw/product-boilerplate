import { Link, useLoaderData } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader() {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

  return { sessions }
}

export default function Landing() {
  const { sessions } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <>
      <h1>Landing</h1>
      <ul>
        {sessions.ok ? (
          <li>
            <Link to="/dashboard">ダッシュボード</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">ログイン</Link>
            </li>
            <li>
              <Link to="/signup">アカウント作成</Link>
            </li>
          </>
        )}
      </ul>
    </>
  )
}
