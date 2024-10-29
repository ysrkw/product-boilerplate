import { Form, Link, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function loader() {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  return {}
}

export default function PasswordRequest() {
  return (
    <Form id="passwordRequest" method="POST">
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" required type="email" />
      </div>
      <div>
        <button type="submit">パスワード変更を送信</button>
      </div>
      <div>
        <Link to="/login">ログイン画面に戻る</Link>
      </div>
    </Form>
  )
}
