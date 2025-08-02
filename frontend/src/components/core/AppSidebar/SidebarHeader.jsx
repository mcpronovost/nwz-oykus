import { useMemo, useRef } from "react";
import { SquircleDashed } from "lucide-react";

import { useStore } from "@/services/store";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";

import { OykDropdown } from "@/components/common";

export default function SidebarHeader() {
  const { currentUser, currentWorld, setCurrentWorld } = useStore();
  const { refresh } = useRouter();

  const dropdownRef = useRef(null);

  const handleWorldClick = (world) => {
    setCurrentWorld(world);
    dropdownRef.current?.close();
    refresh();
  };

  const worldsMenu = useMemo(() => {
    return currentUser
      ? [
          {
            label: "Oykus",
            element: (
              <button
                className="oyk-app-sidebar-header-button-dropdown-item"
                onClick={() => handleWorldClick()}
              >
                <span className="oyk-app-sidebar-header-button-dropdown-item-logo" style={{ backgroundColor: "var(--oyk-default-primary)" }}>
                  <SquircleDashed size={18} color="var(--oyk-default-primary-fg)" />
                </span>
                <span className="oyk-app-sidebar-header-button-dropdown-item-brand">
                  Oykus
                </span>
              </button>
            ),
          },
          ...currentUser.worldsOwned.map((world) => ({
            label: world.name,
            element: (
              <button
                className="oyk-app-sidebar-header-button-dropdown-item"
                onClick={() => handleWorldClick(world)}
              >
                <span className="oyk-app-sidebar-header-button-dropdown-item-logo" style={{ backgroundColor: world.themes[0]?.primary || "var(--oyk-default-primary)" }}>
                  <span style={{ color: world.themes[0]?.primaryFg || "var(--oyk-default-primary-fg)" }}>
                    {world.abbr}
                  </span>
                </span>
                <span className="oyk-app-sidebar-header-button-dropdown-item-brand">
                  {world.name}
                </span>
              </button>
            ),
          })),
        ]
      : [];
  }, [currentUser, handleWorldClick]);

  return (
    <header className="oyk-app-sidebar-header">
      <OykDropdown
        ref={dropdownRef}
        toggle={
          <button className="oyk-app-sidebar-header-button" disabled={!currentUser}>
            {currentUser && currentWorld ? (
              <>
                <span className="oyk-app-sidebar-header-button-logo" style={{ backgroundColor: currentWorld.themes[0]?.primary || "var(--oyk-c-primary)" }}>
                  <span style={{ color: currentWorld.themes[0]?.primaryFg || "var(--oyk-c-primary-fg)" }}>
                    {currentWorld.abbr}
                  </span>
                </span>
                <span className="oyk-app-sidebar-header-button-brand">
                  {currentWorld.name}
                </span>
              </>
            ) : (
              <>
                <span className="oyk-app-sidebar-header-button-logo">
                  <SquircleDashed size={18} color="var(--oyk-c-primary-fg)" />
                </span>
                <span className="oyk-app-sidebar-header-button-brand">
                  Oykus
                </span>
              </>
            )}
          </button>
        }
        menu={worldsMenu}
        direction="full"
        disabled={!currentUser}
      />
    </header>
  );
}
