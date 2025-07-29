import "@/styles/core/app-notfound.scss";

export default function AppNotFound() {
  return (
    <section className="nwz-app-not-found">
      <div className="nwz-app-not-found-content">
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
      <div className="nwz-app-not-found-actions">
        <button className="nwz-app-not-found-actions-button">Go to home</button>
      </div>
    </section>
  );
}