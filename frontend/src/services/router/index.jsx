import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ROUTES } from "./routes";
import { getLangFromPath, findRoute } from "./utils";

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
    (name, language = lang) => {
      const route =
        ROUTES.find((r) => r.name === name) ||
        ROUTES.find((r) => r.name === "404");
      if (!route) return;
      const newPath = `/${language}/${route.paths[language]}`;
      window.history.pushState({}, "", newPath);
      setHistory((h) => [...h, newPath]);
      setLang(language);
      setRoute(route);
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
    n: (name, language = lang) => navigate(name, language),
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
    return INITIAL_STATE;
  }
  return context;
}
