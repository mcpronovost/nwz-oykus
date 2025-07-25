import React from "react";
import { RouterProvider, useRouter } from "./services/router";
import "./styles/core/base.scss";

function Sidebar() {
  const { navigate, lang } = useRouter();
  return (
    <div className="sidebar">
      <button onClick={() => navigate("home", lang)}>🏠</button>
      <button onClick={() => navigate("tasks", lang)}>📋</button>
      <button onClick={() => navigate("kanban", lang)}>📊</button>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div>
        <h1 style={{ margin: 0, fontSize: "18px" }}>Tasks</h1>
      </div>
      <div className="nav-bar">
        <button>🔍 Search</button>
        <button>⚙️ Settings</button>
      </div>
    </div>
  );
}

function Layout() {
  const { route } = useRouter();
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main>
          {(route && route.component) ? (
            <React.Suspense fallback={<div>Loading…</div>}>
              {React.createElement(route.component)}
            </React.Suspense>
          ) : (
            <div>404</div>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <Layout />
    </RouterProvider>
  );
}

export default App; 