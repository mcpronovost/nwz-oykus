export default function OykCard({ children, className, style }) {
  return (
    <div className={`oyk-card ${className}`} style={style}>
      {children}
    </div>
  );
}
