import { useId, useState } from "react";
import "./RangeInput.css";

function RangeInput({
  id,
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onReset,
  showReset = false,
  resetLabel = "Reset",
  disabled = false,
  className = "",
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [internalValue, setInternalValue] = useState(min);
  const isControlled = Number.isFinite(value);
  const currentValue = isControlled ? value : internalValue;
  const safeValue = Number.isFinite(currentValue) ? currentValue : min;
  const range = max - min;
  const progress = range === 0 ? 0 : ((safeValue - min) / range) * 100;
  const shouldShowReset = Boolean(showReset && onReset);
  const rootClassName = [
    "range-input",
    shouldShowReset ? "range-input--reset" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (event) => {
    const nextValue = Number(event.target.value);
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    if (onChange) {
      onChange(nextValue);
    }
  };

  return (
    <div
      className={rootClassName}
      style={{ "--range-progress": `${progress}%` }}
    >
      {label || isControlled ? (
        <div className="range-input__header">
          {label ? (
            <label className="range-input__label" htmlFor={inputId}>
              {label}
            </label>
          ) : (
            <span className="range-input__label" />
          )}
        </div>
      ) : null}
      <div className="range-input__control-wrap">
        <input
            id={inputId}
            className="range-input__control"
            type="range"
            min={min}
            max={max}
            step={step}
            value={safeValue}
            onChange={handleChange}
            disabled={disabled}
        />
        {isControlled ? (
            <span className="range-input__value">{safeValue}</span>
        ) : null}
      </div>
      {shouldShowReset ? (
        <button type="button" className="range-input__reset" onClick={onReset}>
          {resetLabel}
        </button>
      ) : null}
    </div>
  );
}

export default RangeInput;
