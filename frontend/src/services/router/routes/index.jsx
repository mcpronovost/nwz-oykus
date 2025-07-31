import React from "react";

export const ROUTES = [
  {
    name: "home",
    component: React.lazy(() => import("../../../pages/Home")),
    paths: {
      fr: "",
      en: "",
    },
  },
  {
    name: "about",
    component: React.lazy(() => import("../../../pages/About")),
    paths: {
      fr: "a-propos",
      en: "about",
    },
  },
  {
    name: "tasks",
    component: React.lazy(() => import("../../../pages/Tasks")),
    paths: {
      fr: "taches",
      en: "tasks",
    },
  },
  {
    name: "settings",
    component: React.lazy(() => import("../../../pages/ModalExample")),
    paths: {
      fr: "parametres",
      en: "settings",
    },
  },
  {
    name: "404",
    component: React.lazy(() => import("../../../pages/Error404")),
    paths: {
      fr: "404",
      en: "404",
    },
  },
];
