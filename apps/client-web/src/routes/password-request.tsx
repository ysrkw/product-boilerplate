import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  const response = await api
    .post('passwords/requests', { body: form, signal: request.signal })
    .json<{ ok: boolean }>()

  if (response.ok) {
    return redirect('/passwords/requests/complete')
  }

  return response
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessions = await api
    .get('sessions', { signal: request.signal })
    .json<{ ok: boolean }>()

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
        <button type="submit">パスワードの変更先URLを送信</button>
      </div>
      <div>
        <Link to="/login">ログイン画面に戻る</Link>
      </div>
    </Form>
  )
}
