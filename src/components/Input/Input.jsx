import { useId, useState } from 'react'
import './Input.css'

function Input({
  id,
  label,
  tooltip,
  tooltipId,
  tooltipPlacement = 'top',
  wrapperClassName,
  inputClassName,
  tooltipClassName,
  onFocus,
  onBlur,
  ...inputProps
}) {
  const reactId = useId()
  const baseId = id || inputProps.name || `input-${reactId}`
  const resolvedTooltipId = tooltipId || `${baseId}-tooltip`
  const [isFocused, setIsFocused] = useState(false)
  const resolvedTooltipClass = tooltipClassName || 'input-field__tooltip'
  const placementClass =
    tooltipPlacement === 'bottom'
      ? 'input-field__tooltip--bottom'
      : 'input-field__tooltip--top'
  const resolvedAutoComplete = tooltip ? 'off' : inputProps.autoComplete

  const handleFocus = (event) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  const showTooltip = Boolean(tooltip) && isFocused

  return (
    <div className={wrapperClassName}>
      {label ? (
        <label htmlFor={baseId} className="input-field__label">
          {label}
        </label>
      ) : null}
      <input
        {...inputProps}
        id={baseId}
        className={inputClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete={resolvedAutoComplete}
        aria-describedby={showTooltip ? resolvedTooltipId : undefined}
      />
      {showTooltip ? (
        <div
          id={resolvedTooltipId}
          role="status"
          className={`${resolvedTooltipClass} ${placementClass}`}
        >
          {tooltip}
        </div>
      ) : null}
    </div>
  )
}

export default Input
