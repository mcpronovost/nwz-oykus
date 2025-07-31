import { useMemo, useRef } from "react";
import { SquircleDashed } from "lucide-react";

import { useStore } from "@/services/store";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";

import { Dropdown } from "@/components/common";

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
                <span className="oyk-app-sidebar-header-button-dropdown-item-logo">
                  <SquircleDashed size={18} color="var(--oyk-primary-fg)" />
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
                <span className="oyk-app-sidebar-header-button-dropdown-item-logo">
                  <SquircleDashed size={18} color="var(--oyk-primary-fg)" />
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
      <Dropdown
        ref={dropdownRef}
        toggle={
          <button className="oyk-app-sidebar-header-button">
            {currentWorld ? (
              <>
                <span className="oyk-app-sidebar-header-button-logo">
                  <SquircleDashed size={18} color="var(--oyk-primary-fg)" />
                </span>
                <span className="oyk-app-sidebar-header-button-brand">
                  {currentWorld.name}
                </span>
              </>
            ) : (
              <>
                <span className="oyk-app-sidebar-header-button-logo">
                  <SquircleDashed size={18} color="var(--oyk-primary-fg)" />
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
      />
    </header>
  );
}
