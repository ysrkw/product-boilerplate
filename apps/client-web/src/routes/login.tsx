import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  await api.post('login', { body: form }).json()

  return redirect('/dashboard')
}

export async function loader() {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  return {}
}

export default function Login() {
  return (
    <Form id="login" method="POST">
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" required type="email" />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          maxLength={80}
          minLength={8}
          name="password"
          required
          type="password"
        />
      </div>
      <div>
        <button type="submit">ログイン</button>
      </div>
      <div>
        <Link to="/password-request">パスワードを忘れた方はこちら</Link>
      </div>
    </Form>
  )
}
