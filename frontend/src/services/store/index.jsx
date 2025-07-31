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
    });
  }, [
    currentUser,
    isAuthenticated,
    handleSetCurrentUser,
    handleSetAuthenticated,
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
