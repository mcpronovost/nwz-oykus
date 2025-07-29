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

export function RouterProvider({ children }) {
  const [history, setHistory] = useState([window.location.pathname]);
  const [lang, setLang] = useState(getLangFromPath(window.location.pathname));
  const [route, setRoute] = useState(() =>
    findRoute(
      window.location.pathname,
      getLangFromPath(window.location.pathname)
    )
  );

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
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}
