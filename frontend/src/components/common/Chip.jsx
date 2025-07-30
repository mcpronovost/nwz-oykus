export default function Chip({ children, color = "default" }) {
  return (
    <span className={`oyk-chip oyk-chip-${color}`}>
      <span className="oyk-chip-content">{children}</span>
    </span>
  );
}
