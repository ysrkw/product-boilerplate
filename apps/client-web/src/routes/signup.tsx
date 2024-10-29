import { ActionFunctionArgs, Form, redirect } from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  await api.post('signup', { body: form }).json()

  return redirect('/dashboard')
}

export async function loader() {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  return {}
}

export default function Signup() {
  return (
    <Form id="signup" method="POST">
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
        <label htmlFor="termsOfService">利用規約の同意</label>
        <input
          id="termsOfService"
          name="termsOfService"
          required
          type="checkbox"
        />
      </div>
      <div>
        <label htmlFor="privacyPolicy">プライバシーポリシーの同意</label>
        <input
          id="privacyPolicy"
          name="privacyPolicy"
          required
          type="checkbox"
        />
      </div>
      <div>
        <button type="submit">アカウントの作成</button>
      </div>
    </Form>
  )
}
