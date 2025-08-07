import React from "react";

export const DEV_ROUTES = [
  {
    name: "dev",
    component: React.lazy(() => import("../../../pages/Error404")),
    paths: {
      fr: "dev",
      en: "dev",
    },
    children: [
      {
        name: "dev-components",
        component: React.lazy(() => import("../../../pages/Dev/Components")),
        paths: {
          fr: "composants",
          en: "components",
        },
      },
      {
        name: "dev-quests",
        component: React.lazy(() => import("../../../pages/Dev/Quests")),
        paths: {
          fr: "quetes",
          en: "quests",
        },
      },
    ],
  },
];
