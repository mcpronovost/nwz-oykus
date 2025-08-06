import React, { useRef } from "react";
import { useRouter } from "@/services/router";
import { getLangFromPath } from "@/services/router/utils";

import Providers from "@/components/Providers";
import AppSidebar from "@/components/core/AppSidebar";
import AppBar from "@/components/core/AppBar";
import AppLoading from "@/components/core/AppLoading";
import AppNotFound from "@/components/core/AppNotFound";

function MainLayout() {
  const { route } = useRouter();

  return (
    <main id="oyk-app-main">
      {route && route.component ? (
        <React.Suspense fallback={<AppLoading />}>{React.createElement(route.component)}</React.Suspense>
      ) : (
        <AppNotFound />
      )}
    </main>
  );
}

function Layout() {
  return (
    <div id="oyk-app">
      <AppSidebar />
      <div id="oyk-app-core">
        <AppBar />
        <MainLayout />
      </div>
    </div>
  );
}

function App() {
  const lang = useRef(getLangFromPath(window.location.pathname));

  return (
    <Providers lang={lang.current}>
      <Layout />
    </Providers>
  );
}

export default App;
