import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AUTH_TOKEN_KEY, USER_KEY } from "./constants";
import { storeGetItem, storeSetItem, storeRemoveItem } from "./utils";
import { authStore } from "./stores/auth";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return storeGetItem(USER_KEY);
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = storeGetItem(AUTH_TOKEN_KEY);
    return !!token;
  });
  const [storeAppSidebarOpen, setStoreAppSidebarOpen] = useState(() => {
    return storeGetItem("app-sidebar-open") ?? true;
  });

  const handleSetCurrentUser = useCallback((user) => {
    if (user) {
      storeSetItem(USER_KEY, user);
      setCurrentUser(user);
    } else {
      storeRemoveItem(USER_KEY);
      setCurrentUser(null);
    }
  }, []);

  const handleSetAuthenticated = useCallback((authenticated) => {
    setIsAuthenticated(authenticated);
  }, []);

  const handleSetStoreAppSidebarOpen = useCallback((value) => {
    storeSetItem("app-sidebar-open", value);
    setStoreAppSidebarOpen(value);
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
    storeAppSidebarOpen,
    setStoreAppSidebarOpen: handleSetStoreAppSidebarOpen,
    currentUser,
    setCurrentUser: handleSetCurrentUser,
    isAuthenticated,
    setAuthenticated: handleSetAuthenticated,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
