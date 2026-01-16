import { useNavigate } from "react-router-dom";
import { SignupForm } from "@features/auth";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();

  return (
    <main className="signup-page">
      <section className="signup-page__body">
        <div className="signup-page__container">
          <div className="signup-card" aria-label="Signup card">
            <h1 className="signup-page__logo">Instagram</h1>
            <p className="signup-page__lead">
              친구들의 사진과 동영상을 보려면 가입하세요.
            </p>
            <div className="login-divider">
              <span />
              <p>또는</p>
              <span />
            </div>

            <SignupForm />

            <p className="signup-page__notice">
              저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에
              업로드했을 수도 있습니다.{" "}
              <button type="button" className="signup-page__more">
                더 알아보기
              </button>
            </p>
          </div>

          <p className="signup-login">
            계정이 있으신가요?
            <br />
            <button type="button" onClick={() => navigate("/login")}>
              로그인
            </button>
          </p>
        </div>
      </section>

      <footer className="signup-page__footer">
        <nav className="signup-footer__links" aria-label="footer links">
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

        <div className="signup-footer__meta">
          <span>한국어</span>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </main>
  );
}

export default SignupPage;
