export default function Avatar({ name, abbr, src }) {
  return (
    <div className="oyk-avatar">
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className="oyk-avatar-abbr">{abbr || name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}