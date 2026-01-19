import { LoginForm } from "@features/auth";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-page__body">
        <div className="login-page__container">
          <div className="login-card" aria-label="Login card">
            <h1 className="login-page__logo">Instagram</h1>
            <LoginForm />
          </div>
          <p className="login-signup">
            계정이 없으신가요? <Link to="/signup">가입하기</Link>
          </p>
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
          <button type="button">Instagram Lite</button>
          <button type="button">Meta AI</button>
          <button type="button">Threads</button>
          <button type="button">연락처 업로드 & 비사용자</button>
          <button type="button">Meta Verified</button>
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
