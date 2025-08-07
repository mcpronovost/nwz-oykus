export default function OykCard({ children, nop = false, className, style }) {
  return (
    <div className={`oyk-card ${nop ? "oyk-card-nop" : ""} ${className ? className : ""}`} style={style}>
      {children}
    </div>
  );
}
