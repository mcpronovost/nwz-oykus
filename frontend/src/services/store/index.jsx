import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { storeGetItem, storeSetItem } from "./utils";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [storeAppSidebarOpen, setStoreAppSidebarOpen] = useState(() => {
    return storeGetItem("app-sidebar-open") ?? true;
  });

  const handleSetStoreAppSidebarOpen = useCallback((value) => {
    storeSetItem("app-sidebar-open", value);
    setStoreAppSidebarOpen(value);
  }, []);

  const value = {
    storeAppSidebarOpen,
    setStoreAppSidebarOpen: (key, value) => handleSetStoreAppSidebarOpen(key, value),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
