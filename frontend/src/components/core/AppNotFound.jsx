import "@/styles/core/app-notfound.scss";

export default function AppNotFound() {
  return (
    <section className="oyk-app-not-found">
      <div className="oyk-app-not-found-content">
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
      <div className="oyk-app-not-found-actions">
        <button className="oyk-app-not-found-actions-button">Go to home</button>
      </div>
    </section>
  );
}