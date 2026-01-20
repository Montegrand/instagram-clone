import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupWithEmail } from '@services/authApi.js'

const getDefaultState = () => ({
  email: '',
  password: '',
  name: '',
  nickname: '',
})

const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const useSignupForm = () => {
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

    try {
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
      navigate('/', {
        state: {
          fromSignup: true,
          email: form.email.trim(),
        },
      })
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.message || '회원가입 중 오류가 발생했습니다.',
        message: '',
      })
    }
  }

  return {
    form,
    status,
    isDisabled,
    onChange,
    onSubmit,
  }
}
