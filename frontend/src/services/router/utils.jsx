import { ROUTES } from "./routes";
import { DEFAULT_LANG } from "../translation/utils";

export const getLangFromPath = (pathname) => {
  const match = pathname.match(/^\/(fr|en)(\/|$)/);
  return match ? match[1] : DEFAULT_LANG;
};

export const findRoute = (pathname, pathlang) => {
  const path = pathname.replace(/^\/(fr|en)/, "").replace(/^\//, "");
  return ROUTES.find((route) => route.paths[pathlang] === path) || null;
};
