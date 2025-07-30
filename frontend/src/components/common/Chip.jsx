export default function Chip({ children, color = "default", outline = false }) {
  return (
    <span className={`oyk-chip oyk-chip-${color} ${outline ? "oyk-chip-outline" : ""}`}>
      <span className="oyk-chip-content">{children}</span>
    </span>
  );
}
