import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailVerifyModal from '@features/auth/EmailVerifyModal/EmailVerifyModal.jsx'
import { loginWithEmail, resendVerificationEmail } from '@services/authApi.js'
import './LoginForm.css'

const getDefaultState = () => ({
  email: '',
  password: '',
})

function LoginForm() {
  const [form, setForm] = useState(getDefaultState)
  const [status, setStatus] = useState({ loading: false, error: '' })
  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [pendingCredentials, setPendingCredentials] = useState(null)
  const navigate = useNavigate()

  const isDisabled = useMemo(() => {
    return !form.email.trim() || !form.password.trim() || status.loading
  }, [form.email, form.password, status.loading])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, error: '' })

    const result = await loginWithEmail({
      email: form.email.trim(),
      password: form.password.trim(),
    })

    if (!result.ok) {
      if (result.code === 'EMAIL_NOT_VERIFIED') {
        setPendingCredentials({
          email: form.email.trim(),
          password: form.password.trim(),
        })
        setVerifyModalOpen(true)
        setStatus({ loading: false, error: '' })
        return
      }

      setStatus({ loading: false, error: result.error || 'Login failed.' })
      return
    }

    setStatus({ loading: false, error: '' })
    navigate(result.redirectUrl || '/feed')
  }

  const handleResend = async () => {
    if (!pendingCredentials) return
    setStatus({ loading: true, error: '' })
    const result = await resendVerificationEmail(pendingCredentials)
    setStatus({
      loading: false,
      error: result.ok ? '' : result.error || 'Failed to resend verification.',
    })
  }

  return (
    <>
      <form className="login-form" onSubmit={onSubmit}>
        <label className="login-form__field">
          <span className="sr-only">이메일 주소</span>
          <input
            name="email"
            type="email"
            autoComplete="username"
            placeholder="이메일 주소"
            value={form.email}
            onChange={onChange}
          />
        </label>
        <label className="login-form__field">
          <span className="sr-only">비밀번호</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            value={form.password}
            onChange={onChange}
          />
        </label>

        {status.error ? <p className="login-form__error">{status.error}</p> : null}

        <button type="submit" className="login-form__submit" disabled={isDisabled}>
          {status.loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <EmailVerifyModal
        open={verifyModalOpen}
        email={pendingCredentials?.email}
        onClose={() => setVerifyModalOpen(false)}
        onResend={handleResend}
      />
    </>
  )
}

export default LoginForm
