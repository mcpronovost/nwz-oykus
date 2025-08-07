import React from "react";

export const PLAYER_ROUTES = [
  {
    name: "players",
    component: React.lazy(() => import("../../../pages/Error404")),
    paths: {
      fr: "joueurs",
      en: "players",
    },
    children: [
      {
        name: "player-profile",
        component: React.lazy(() => import("../../../pages/Players/Profile")),
        paths: {
          fr: "{playerSlug}",
          en: "{playerSlug}",
        },
      },
    ],
  },
];
