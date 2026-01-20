import './Modal.css'

function Modal({
  open,
  titleId,
  onClose,
  dialogClassName,
  showClose = false,
  closeLabel = '닫기',
  children,
}) {
  if (!open) return null

  return (
    <div className="modal__backdrop" role="presentation" onClick={onClose}>
      {showClose ? (
        <button
          type="button"
          className="modal__close"
          aria-label={closeLabel}
          onClick={(event) => {
            event.stopPropagation()
            onClose?.()
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
          {closeLabel}
        </button>
      ) : null}
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
