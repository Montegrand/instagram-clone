import SignupForm from '@features/auth/SignupForm/SignupForm.jsx'
import './SignupPage.css'

function SignupPage() {
  return (
    <main className="signup-page">
      <section className="signup-page__card">
        <h1 className="signup-page__title">Instagram</h1>
        <SignupForm />
      </section>
    </main>
  )
}

export default SignupPage
