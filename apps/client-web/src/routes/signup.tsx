import { ActionFunctionArgs, Form, redirect } from 'react-router-dom'

export function Signup() {
  return (
    <Form action="/api/signup" method="POST">
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
        <label htmlFor="terms-of-service">利用規約の同意</label>
        <input
          id="terms-of-service"
          name="terms-of-service"
          required
          type="checkbox"
        />
      </div>
      <div>
        <label htmlFor="privacy-policy">プライバシーポリシーの同意</label>
        <input
          id="privacy-policy"
          name="privacy-policy"
          required
          type="checkbox"
        />
      </div>
      <button type="submit">アカウント作成</button>
    </Form>
  )
}

export async function actionSignup({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  console.log(formData)

  return redirect('/dashboard')
}
