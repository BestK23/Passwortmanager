interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="switch-row">
      <span className="switch-row__label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch ${checked ? 'switch--on' : ''}`}
        onClick={onChange}
      >
        <span className="switch__knob" />
      </button>
    </label>
  );
}
