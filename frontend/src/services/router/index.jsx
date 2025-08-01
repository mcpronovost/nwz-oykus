import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ROUTES } from "./routes";
import { getLangFromPath, findRoute, buildRoutePath } from "./utils";

const RouterContext = createContext();

const INITIAL_STATE = {
  history: [window.location.pathname],
  lang: getLangFromPath(window.location.pathname),
  route: findRoute(window.location.pathname, getLangFromPath(window.location.pathname)),
  n: () => {},
  refresh: () => {
    window.location.reload();
  },
};

export function RouterProvider({ children }) {
  const [history, setHistory] = useState(INITIAL_STATE.history);
  const [lang, setLang] = useState(INITIAL_STATE.lang);
  const [route, setRoute] = useState(INITIAL_STATE.route);

  const navigate = useCallback(
    (name, language = lang, params = {}) => {
      // Build the full path for the route
      const routePath = buildRoutePath(name, language, params);
      if (routePath === null || routePath === undefined) {
        // Fallback to 404 if route not found
        const fallbackRoute = ROUTES.find((r) => r.name === "404");
        if (fallbackRoute) {
          const newPath = `/${language}/${fallbackRoute.paths[language]}`;
          window.history.pushState({}, "", newPath);
          setHistory((h) => [...h, newPath]);
          setLang(language);
          setRoute(fallbackRoute);
        }
        return;
      }

      const newPath = `/${language}/${routePath}`;
      window.history.pushState({}, "", newPath);
      setHistory((h) => [...h, newPath]);
      setLang(language);
      
      // Find and set the actual route
      const actualRoute = findRoute(newPath, language);
      setRoute(actualRoute);
    },
    [lang]
  );

  const refresh = useCallback(() => {
    window.location.reload();
  }, [lang, route]);

  useEffect(() => {
    if (window.document.documentElement.lang !== lang) {
      window.document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      const newLang = getLangFromPath(window.location.pathname);
      setLang(newLang);
      setRoute(findRoute(window.location.pathname, newLang));
      setHistory((h) => [...h, window.location.pathname]);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = {
    route,
    lang,
    history,
    n: (name, language = lang, params = {}) => navigate(name, language, params),
    refresh,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    window.location.reload();
    return INITIAL_STATE;
  }
  return context;
}
