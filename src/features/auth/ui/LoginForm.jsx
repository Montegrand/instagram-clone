import Button from '@components/ui/Button/Button.jsx'
import Input from '@components/Input/Input.jsx'
import EmailVerifyModal from './EmailVerifyModal.jsx'
import { useLoginForm } from '../hooks/index.js'
import { useLocation } from 'react-router-dom'
import './LoginForm.css'

function LoginForm() {
  const location = useLocation()
  const fromSignup = !!location.state?.fromSignup
  const initialEmail =
    fromSignup && typeof location.state?.email === 'string' ? location.state.email : ''
  const {
    form,
    status,
    isDisabled,
    verifyModalOpen,
    pendingEmail,
    canResend,
    onChange,
    onSubmit,
    onCloseVerifyModal,
    onResendVerification,
  } = useLoginForm({ initialEmail, initialVerifyOpen: fromSignup })

  return (
    <>
      <form className="login-form" onSubmit={onSubmit}>
        <Input
          wrapperClassName="login-field"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="전화번호, 사용자 이름 또는 이메일"
          tooltip="SMS 인증 미구현으로 이메일로 가입한 계정만 로그인 가능합니다."
          value={form.email}
          onChange={onChange}
          aria-label="전화번호, 사용자 이름 또는 이메일"
        />

        <Input
          wrapperClassName="login-field"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
          aria-label="비밀번호"
        />

        {status.error ? <p className="login-form__error">{status.error}</p> : null}

        <button type="submit" className="login-btn" disabled={isDisabled}>
          {status.loading ? '로그인 중...' : '로그인'}
        </button>

        <div className="login-divider" aria-hidden="true">
          <span />
          <p>또는</p>
          <span />
        </div>

        <Button type="button" className="login-forgot">
          비밀번호를 잊으셨나요?
        </Button>
      </form>

      <EmailVerifyModal
        open={verifyModalOpen}
        email={pendingEmail}
        onClose={onCloseVerifyModal}
        onResend={canResend ? onResendVerification : null}
      />
    </>
  )
}

export default LoginForm
