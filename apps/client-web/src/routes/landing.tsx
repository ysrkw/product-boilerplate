import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <>
      <h1>Landing</h1>
      <div>
        <Link to="/login">ログイン</Link>
      </div>
      <div>
        <Link to="/signup">アカウント作成</Link>
      </div>
    </>
  )
}
