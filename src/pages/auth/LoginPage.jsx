import LoginForm from '@features/auth/LoginForm/LoginForm.jsx'
import './LoginPage.css'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-page__card">
        <h1 className="login-page__title">Instagram</h1>
        <LoginForm />
      </section>
    </main>
  )
}

export default LoginPage
