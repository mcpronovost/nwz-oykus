export default function OykFormField({ label, name, type = "text", options = [], defaultValue, required = false, onChange, hasError, ...props }) {
  return (
    <div className="oyk-form-group" {...props}>
      <label htmlFor={`field-${name}`}>{label}{required && <span className="oyk-form-group-required">*</span>}</label>
      {type === "textarea" ? (
        <textarea
          id={`field-${name}`}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          rows={6}
          required={required}
        />
      ) : type === "select" ? (
        <select
          id={`field-${name}`}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={`field-${name}`}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
        />
      )}
      {hasError && <p className="oyk-form-group-error">{hasError}</p>}
    </div>
  );
}
