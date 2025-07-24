import { ROUTES } from "./routes";

export const getLangFromPath = (pathname) => {
  const match = pathname.match(/^\/(fr|en)(\/|$)/);
  return match ? match[1] : "en";
};

export const findRoute = (pathname, pathlang) => {
  const path = pathname.replace(/^\/(fr|en)/, "").replace(/^\//, "");
  return ROUTES.find((route) => route.paths[pathlang] === path) || null;
};
