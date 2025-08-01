export default function OykFormField({ label, name, type = "text", defaultValue, onChange, hasError, ...props }) {
  return (
    <div className="oyk-form-group" {...props}>
      <label htmlFor={`field-${name}`}>{label}</label>
      <input
        type={type}
        id={`field-${name}`}
        name={name}
        value={defaultValue}
        onChange={onChange}
      />
      {hasError && <p className="oyk-form-group-error">{hasError}</p>}
    </div>
  );
}
