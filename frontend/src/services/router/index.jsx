import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ROUTES } from "./routes";

const getLocaleFromPath = (pathname) => {
  const match = pathname.match(/^\/(fr|en)(\/|$)/);
  return match ? match[1] : "en";
};

const findRoute = (pathname, locale) => {
  const path = pathname.replace(/^\/(fr|en)/, "").replace(/^\//, "");
  return ROUTES.find((route) => route.paths[locale] === path) || null;
};

const RouterContext = createContext();

export function RouterProvider({ children }) {
  const [history, setHistory] = useState([window.location.pathname]);
  const [locale, setLocale] = useState(
    getLocaleFromPath(window.location.pathname)
  );
  const [route, setRoute] = useState(() =>
    findRoute(
      window.location.pathname,
      getLocaleFromPath(window.location.pathname)
    )
  );

  const navigate = useCallback(
    (name, lang = locale) => {
      const route = ROUTES.find((r) => r.name === name);
      if (!route) return;
      const newPath = `/${lang}/${route.paths[lang]}`;
      window.history.pushState({}, "", newPath);
      setHistory((h) => [...h, newPath]);
      setLocale(lang);
      setRoute(route);
    },
    [locale]
  );

  useEffect(() => {
    const onPopState = () => {
      const newLocale = getLocaleFromPath(window.location.pathname);
      setLocale(newLocale);
      setRoute(findRoute(window.location.pathname, newLocale));
      setHistory((h) => [...h, window.location.pathname]);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = {
    route,
    locale,
    history,
    navigate,
  };

  return (
    <RouterContext.Provider value={value}>
      {route && route.component ? (
        <React.Suspense fallback={<div>Loading…</div>}>
          {React.createElement(route.component)}
        </React.Suspense>
      ) : (
        <div>404</div>
      )}
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
