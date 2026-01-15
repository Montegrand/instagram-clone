import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupWithEmail } from '@services/authApi.js'
import Input from '@components/Input/Input.jsx'
import './SignupForm.css'

const getDefaultState = () => ({
  email: '',
  password: '',
  name: '',
  nickname: '',
})

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function SignupForm() {
  const [form, setForm] = useState(getDefaultState)
  const [status, setStatus] = useState({ loading: false, error: '', message: '' })
  const navigate = useNavigate()

  const isDisabled = useMemo(() => {
    return (
      !form.email.trim() ||
      !form.password.trim() ||
      !form.name.trim() ||
      status.loading
    )
  }, [form.email, form.password, form.name, status.loading])

  const validateForm = () => {
    const emailValue = form.email.trim()

    if (!emailValue) {
      return '이메일을 입력해주세요.'
    }
    if (!emailValue.includes('@')) {
      return 'SMS 인증은 현재 제한되어 있어 이메일로 가입해주세요.'
    }
    if (!isValidEmail(emailValue)) {
      return '올바른 이메일 형식을 입력해주세요.'
    }
    if (!form.password.trim()) {
      return '비밀번호를 입력해주세요.'
    }
    if (!form.name.trim()) {
      return '이름을 입력해주세요.'
    }
    return ''
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setStatus({ loading: false, error: validationError, message: '' })
      return
    }

    setStatus({ loading: true, error: '', message: '' })

    const result = await signupWithEmail({
      email: form.email.trim(),
      password: form.password.trim(),
      name: form.name.trim(),
      nickname: form.nickname.trim(),
    })

    if (!result.ok) {
      setStatus({ loading: false, error: result.error || 'Signup failed.', message: '' })
      return
    }

    setStatus({
      loading: false,
      error: '',
      message: '가입 완료! 이메일 인증 후 로그인해주세요.',
    })
    navigate(result.redirectUrl || '/')
  }

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <Input
        wrapperClassName="signup-form__field"
        name="email"
        type="text"
        autoComplete="email"
        placeholder="이메일 또는 휴대폰 번호"
        value={form.email}
        onChange={onChange}
        tooltip="SMS 인증은 현재 제한되어 있어 이메일로 가입해주세요."
      />
      <Input
        wrapperClassName="signup-form__field"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호"
        value={form.password}
        onChange={onChange}
      />
      <Input
        wrapperClassName="signup-form__field"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="이름"
        value={form.name}
        onChange={onChange}
      />
      <Input
        wrapperClassName="signup-form__field"
        name="nickname"
        type="text"
        autoComplete="nickname"
        placeholder="사용자 이름"
        value={form.nickname}
        onChange={onChange}
      />

      {status.error ? <p className="signup-form__error">{status.error}</p> : null}
      {status.message ? <p className="signup-form__message">{status.message}</p> : null}

      <button type="submit" className="signup-form__submit" disabled={isDisabled}>
        {status.loading ? '가입 중...' : '가입하기'}
      </button>
    </form>
  )
}

export default SignupForm
