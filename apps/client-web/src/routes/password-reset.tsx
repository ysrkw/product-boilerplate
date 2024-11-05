import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData()

  const response = await api
    .post(`passwords/resets/${params.resetId}`, {
      body: form,
      signal: request.signal,
    })
    .json<{ ok: boolean }>()

  if (response.ok) {
    return redirect(`/passwords/resets/${params.resetId}/complete`)
  }

  return response
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const sessions = await api
    .get('sessions', { signal: request.signal })
    .json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  const passwordsReset = await api
    .get(`passwords/resets/${params.resetId}`, { signal: request.signal })
    .json<{ ok: boolean }>()

  if (!passwordsReset.ok) throw redirect('/')

  return {}
}

export default function PasswordReset() {
  return (
    <Form id="passwordReset" method="POST">
      <div>
        <label htmlFor="password">新しいパスワード</label>
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
        <label htmlFor="confirmPassword">新しいパスワード（確認用）</label>
        <input
          id="confirmPassword"
          maxLength={80}
          minLength={8}
          name="confirmPassword"
          required
          type="password"
        />
      </div>
      <div>
        <button type="submit">パスワードの変更</button>
      </div>
    </Form>
  )
}
