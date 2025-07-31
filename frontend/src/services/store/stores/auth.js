import { AUTH_TOKEN_KEY, USER_KEY } from "../constants";
import { storeGetItem, storeSetItem, storeRemoveItem } from "../utils";

// This will be set by the store provider
let storeInstance = null;

export const authStore = {
  // Set the store instance for reactivity
  setStore: (store) => {
    storeInstance = store;
  },

  // Token management
  getToken: () => storeGetItem(AUTH_TOKEN_KEY),
  setToken: (token) => {
    storeSetItem(AUTH_TOKEN_KEY, token);
    if (storeInstance) {
      storeInstance.setAuthenticated(!!token);
    }
  },
  removeToken: () => {
    storeRemoveItem(AUTH_TOKEN_KEY);
    if (storeInstance) {
      storeInstance.setAuthenticated(false);
    }
  },

  // User management
  getUser: () => {
    if (storeInstance) {
      return storeInstance.currentUser;
    }
    return storeGetItem(USER_KEY);
  },
  setUser: (user) => {
    storeSetItem(USER_KEY, user);
    if (storeInstance) {
      storeInstance.setCurrentUser(user);
    }
  },
  removeUser: () => {
    storeRemoveItem(USER_KEY);
    if (storeInstance) {
      storeInstance.setCurrentUser(null);
    }
  },

  // Authentication state
  isAuthenticated: () => {
    if (storeInstance) {
      return storeInstance.isAuthenticated;
    }
    const token = storeGetItem(AUTH_TOKEN_KEY);
    return !!token;
  },

  // Clear all auth data
  logout: () => {
    authStore.removeToken();
    authStore.removeUser();
  },
};
