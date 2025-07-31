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

  const value = {
    // Auth
    currentUser,
    setCurrentUser: handleSetCurrentUser,
    isAuthenticated,
    setAuthenticated: handleSetAuthenticated,
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
