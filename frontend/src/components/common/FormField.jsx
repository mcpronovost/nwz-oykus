export default function OykFormField({ label, name, type = "text", defaultValue, onChange, ...props }) {
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
    </div>
  );
}
