export default function Avatar({ name, abbr, src, borderColor = "var(--oyk-card-bg)" }) {
  return (
    <div className="oyk-avatar" style={{ borderColor }}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className="oyk-avatar-abbr">{abbr || name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}