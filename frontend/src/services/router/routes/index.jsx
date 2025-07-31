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
    name: "login",
    component: React.lazy(() => import("../../../pages/Auth/Login")),
    paths: {
      fr: "connexion",
      en: "login",
    },
  },
  {
    name: "register",
    component: React.lazy(() => import("../../../pages/Auth/Register")),
    paths: {
      fr: "inscription",
      en: "register",
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
