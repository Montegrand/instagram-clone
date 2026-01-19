import './Modal.css'

function Modal({ open, titleId, onClose, dialogClassName, children }) {
  if (!open) return null

  return (
    <div className="modal__backdrop" role="presentation" onClick={onClose}>
      <div
        className={['modal__dialog', dialogClassName].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
