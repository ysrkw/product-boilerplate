import { Link, LoaderFunctionArgs, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader({ request }: LoaderFunctionArgs) {
  const sessions = await api
    .get('sessions', { signal: request.signal })
    .json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  return {}
}

export default function PasswordRequestComplete() {
  return (
    <>
      <div>メールアドレスにパスワードの変更先URLを送信しました。</div>
      <div>
        <Link to="/login">ログイン画面に戻る</Link>
      </div>
    </>
  )
}
