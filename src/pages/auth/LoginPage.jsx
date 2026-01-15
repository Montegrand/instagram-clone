import { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [form, setForm] = useState({ identifier: "", password: "" });

  const isDisabled =
    form.identifier.trim() === "" || form.password.trim() === "";

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="login-page">
      <header className="login-page__header">
        <h1 className="login-page__logo">Instagram</h1>
      </header>

      <section className="login-page__body">
        <div className="login-page__container">
          <div className="login-card" aria-label="Login card">
            <form className="login-form" onSubmit={onSubmit}>
              <label className="login-field">
                <span className="sr-only">
                  전화번호, 사용자 이름 또는 이메일
                </span>
                <input
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  value={form.identifier}
                  onChange={onChange}
                />
              </label>

              <label className="login-field">
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

              <button type="submit" className="login-btn" disabled={isDisabled}>
                로그인
              </button>

              <div className="login-divider" aria-hidden="true">
                <span />
                <p>또는</p>
                <span />
              </div>

              <button type="button" className="login-forgot">
                비밀번호를 잊으셨나요?
              </button>

              <p className="login-signup">
                계정이 없으신가요? <button type="button">가입하기</button>
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="login-page__footer">
        <nav className="login-footer__links" aria-label="footer links">
          <button type="button">Meta</button>
          <button type="button">소개</button>
          <button type="button">블로그</button>
          <button type="button">채용 정보</button>
          <button type="button">도움말</button>
          <button type="button">API</button>
          <button type="button">개인정보처리방침</button>
          <button type="button">약관</button>
        </nav>

        <div className="login-footer__meta">
          <span>한국어</span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </main>
  );
}

export default LoginPage;
