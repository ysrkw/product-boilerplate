import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
} from 'react-router-dom'

import { api } from '../utils/api'

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  return await api
    .post('passwords/requests', { body: form, signal: request.signal })
    .json<{ ok: boolean }>()
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessions = await api
    .get('sessions', { signal: request.signal })
    .json<{ ok: boolean }>()

  if (sessions.ok) throw redirect('/dashboard')

  return {}
}

export default function PasswordRequest() {
  const response = useActionData() as Awaited<ReturnType<typeof action>>
  return (
    <Form id="passwordRequest" method="POST">
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" required type="email" />
      </div>
      <div>
        <button type="submit">パスワード変更を送信</button>
      </div>
      {response?.ok ? <div>送信が完了しました。</div> : <></>}
      <div>
        <Link to="/login">ログイン画面に戻る</Link>
      </div>
    </Form>
  )
}
