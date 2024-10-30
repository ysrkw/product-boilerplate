import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData()

  await api.post(`passwords/resets/${params.resetId}`, { body: form }).json()

  return redirect('/login')
}

export async function loader({ params }: LoaderFunctionArgs) {
  const sessions = await api.get('sessions').json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  const passwordsReset = await api
    .get(`passwords/resets/${params.resetId}`)
    .json<{ ok: boolean }>()

  if (!passwordsReset.ok) throw redirect('/')

  return {}
}

export default function PasswordReset() {
  return (
    <Form id="passwordReset" method="POST">
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
        <button type="submit">変更</button>
      </div>
    </Form>
  )
}
