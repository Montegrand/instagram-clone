import Modal from '@components/Modal/Modal.jsx'
import './EmailVerifyModal.css'

function EmailVerifyModal({ open, email, onClose, onResend }) {
  return (
    <Modal open={open} titleId="email-verify-modal-title" onClose={onClose}>
      <header className="email-verify-modal__header">
        <h2 id="email-verify-modal-title">이메일 인증이 필요합니다</h2>
      </header>
      <div className="email-verify-modal__body">
        <p>인증 메일을 확인한 뒤 다시 로그인해주세요.</p>
        {email ? <p className="email-verify-modal__email">{email}</p> : null}
      </div>
      <div className="email-verify-modal__actions">
        {onResend ? (
          <button type="button" className="email-verify-modal__ghost" onClick={onResend}>
            인증 메일 재전송
          </button>
        ) : null}
        <button type="button" className="email-verify-modal__primary" onClick={onClose}>
          확인
        </button>
      </div>
    </Modal>
  )
}

export default EmailVerifyModal
