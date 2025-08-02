import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { authStore } from "./stores/auth";
import { KEY_TOKEN, KEY_USER, KEY_APP_SIDEBAR_OPEN, KEY_WORLD } from "./constants";
import { storeGetItem, storeSetItem, storeRemoveItem } from "./utils";
import { api } from "@/services/api";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return storeGetItem(KEY_USER);
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = storeGetItem(KEY_TOKEN);
    return !!token;
  });
  const [storeAppSidebarOpen, setStoreAppSidebarOpen] = useState(() => {
    return storeGetItem(KEY_APP_SIDEBAR_OPEN) ?? true;
  });
  const [currentWorld, setCurrentWorld] = useState(() => {
    return storeGetItem(KEY_WORLD);
  });

  const handleSetCurrentUser = useCallback((user) => {
    if (user) {
      storeSetItem(KEY_USER, user);
      setCurrentUser(user);
    } else {
      storeRemoveItem(KEY_USER);
      setCurrentUser(null);
    }
  }, []);

  const handleSetAuthenticated = useCallback((authenticated) => {
    setIsAuthenticated(authenticated);
  }, []);

  const handleSetStoreAppSidebarOpen = useCallback((value) => {
    storeSetItem(KEY_APP_SIDEBAR_OPEN, value);
    setStoreAppSidebarOpen(value);
  }, []);

  const handleSetCurrentWorld = useCallback((value) => {
    storeSetItem(KEY_WORLD, value);
    setCurrentWorld(value);
  }, []);

  // Connect auth store to the reactive store
  useEffect(() => {
    authStore.setStore({
      currentUser,
      setCurrentUser: handleSetCurrentUser,
      isAuthenticated,
      setAuthenticated: handleSetAuthenticated,
      currentWorld,
      setCurrentWorld: handleSetCurrentWorld,
    });
  }, [
    currentUser,
    isAuthenticated,
    currentWorld,
    handleSetCurrentUser,
    handleSetAuthenticated,
    handleSetCurrentWorld,
  ]);

  // Periodic user profile refresh
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Initial profile fetch on mount
    const fetchProfile = async () => {
      try {
        await api.getUserProfile();
      } catch (error) {
        console.warn("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();

    // Set up periodic refresh every 5 minutes
    const interval = setInterval(fetchProfile, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Update world theme if currentWorld exists and has themes, otherwise remove custom theme styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.id = "oyk-world-theme";

    if (currentWorld?.themes?.[0]) {
      const theme = currentWorld.themes[0];
      styleSheet.textContent = `
        :root {
          --oyk-core-bg: ${theme.coreBg};
          --oyk-core-fg: ${theme.coreFg}; 
          --oyk-core-divider: ${theme.coreDivider};
          --oyk-c-primary: ${theme.primary};
          --oyk-c-primary-fg: ${theme.primaryFg};
          --oyk-danger: ${theme.cDanger};
          --oyk-warning: ${theme.cWarning};
          --oyk-success: ${theme.cSuccess};
          --oyk-app-bar-bg: ${theme.appBarBg};
          --oyk-app-sidebar-bg: ${theme.appSidebarBg};
          --oyk-popper-bg: ${theme.popperBg};
          --oyk-popper-fg: ${theme.popperFg};
          --oyk-popper-item-bg: ${theme.popperItemBg};
          --oyk-popper-item-fg: ${theme.popperItemFg};
          --oyk-card-bg: ${theme.cardBg};
          --oyk-card-fg: ${theme.cardFg};
          --oyk-card-item-bg: ${theme.cardItemBg};
          --oyk-card-item-fg: ${theme.cardItemFg};
          --oyk-radius: ${theme.radius}px;
        }
      `;
    }

    const existingStyle = document.getElementById("oyk-world-theme");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(styleSheet);

    return () => {
      styleSheet.remove();
    };
  }, [currentWorld]);

  const value = {
    // Auth
    currentUser,
    setCurrentUser: handleSetCurrentUser,
    isAuthenticated,
    setAuthenticated: handleSetAuthenticated,
    // Manual refresh function
    refreshUserProfile: async () => {
      if (isAuthenticated) {
        try {
          await api.getUserProfile();
        } catch (error) {
          console.warn("Failed to refresh user profile:", error);
          throw error;
        }
      }
    },
    // App
    storeAppSidebarOpen,
    setStoreAppSidebarOpen: handleSetStoreAppSidebarOpen,
    // World
    currentWorld,
    setCurrentWorld: handleSetCurrentWorld,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
