export default function OykHeading({ title, ph = 32 }) {
  return (
    <header className="oyk-heading" style={{ padding: `0 ${ph}px` }}>
      <div className="oyk-heading-content">
        <h1 className="oyk-heading-title">{title}</h1>
      </div>
    </header>
  );
}
