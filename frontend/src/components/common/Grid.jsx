export default function OykGrid({ children, className, ...props }) {
  return (
    <section className={`oyk-grid ${className}`} {...props}>
      {children}
    </section>
  );
}
