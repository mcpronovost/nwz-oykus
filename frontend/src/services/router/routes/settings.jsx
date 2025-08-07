import React from "react";

export const SETTINGS_ROUTES = [
  {
    name: "settings",
    component: React.lazy(() => import("../../../pages/Error404")),
    paths: {
      fr: "parametres",
      en: "settings",
    },
    children: [
      {
        name: "settings-worlds",
        component: React.lazy(() => import("../../../pages/Settings/Worlds")),
        paths: {
          fr: "mondes",
          en: "worlds",
        },
      },
    ],
  },
];
