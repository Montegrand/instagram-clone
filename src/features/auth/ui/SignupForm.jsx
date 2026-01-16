import Input from "@components/Input/Input.jsx";
import { useSignupForm } from "../hooks/index.js";
import "./SignupForm.css";

function SignupForm() {
  const { form, status, isDisabled, onChange, onSubmit } = useSignupForm();

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

      {status.error ? (
        <p className="signup-form__error">{status.error}</p>
      ) : null}
      {status.message ? (
        <p className="signup-form__message">{status.message}</p>
      ) : null}

      <button
        type="submit"
        className="signup-form__submit"
        disabled={isDisabled}
      >
        {status.loading ? "가입 중..." : "가입"}
      </button>
    </form>
  );
}

export default SignupForm;
