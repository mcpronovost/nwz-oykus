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
      } catch {
        // Fail silently
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

    if (currentWorld?.theme) {
      const theme = currentWorld.theme;
      styleSheet.textContent = `
        :root {
          ${theme.coreBg ? `--oyk-core-bg: ${theme.coreBg};` : ""}
          ${theme.coreFg ? `--oyk-core-fg: ${theme.coreFg};` : ""}
          ${theme.coreDivider ? `--oyk-core-divider: ${theme.coreDivider};` : ""}
          ${theme.c_primary ? `--oyk-c-primary: ${theme.c_primary};` : ""}
          ${theme.c_primary_fg ? `--oyk-c-primary-fg: ${theme.c_primary_fg};` : ""}
          ${theme.cDanger ? `--oyk-danger: ${theme.cDanger};` : ""}
          ${theme.cWarning ? `--oyk-warning: ${theme.cWarning};` : ""}
          ${theme.cSuccess ? `--oyk-success: ${theme.cSuccess};` : ""}
          ${theme.appBarBg ? `--oyk-app-bar-bg: ${theme.appBarBg};` : ""}
          ${theme.appSidebarBg ? `--oyk-app-sidebar-bg: ${theme.appSidebarBg};` : ""}
          ${theme.popperBg ? `--oyk-popper-bg: ${theme.popperBg};` : ""}
          ${theme.popperFg ? `--oyk-popper-fg: ${theme.popperFg};` : ""}
          ${theme.popperItemBg ? `--oyk-popper-item-bg: ${theme.popperItemBg};` : ""}
          ${theme.popperItemFg ? `--oyk-popper-item-fg: ${theme.popperItemFg};` : ""}
          ${theme.cardBg ? `--oyk-card-bg: ${theme.cardBg};` : ""}
          ${theme.cardFg ? `--oyk-card-fg: ${theme.cardFg};` : ""}
          ${theme.cardItemBg ? `--oyk-card-item-bg: ${theme.cardItemBg};` : ""}
          ${theme.cardItemFg ? `--oyk-card-item-fg: ${theme.cardItemFg};` : ""}
          ${theme.radius ? `--oyk-radius: ${theme.radius}px;` : ""}
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
