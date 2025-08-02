import { KEY_TOKEN, KEY_USER, KEY_WORLD } from "../constants";
import { storeGetItem, storeSetItem, storeRemoveItem } from "../utils";

// This will be set by the store provider
let storeInstance = null;

export const authStore = {
  // Set the store instance for reactivity
  setStore: (store) => {
    storeInstance = store;
  },

  // Token management
  getToken: () => storeGetItem(KEY_TOKEN),
  setToken: (token) => {
    storeSetItem(KEY_TOKEN, token);
    if (storeInstance) {
      storeInstance.setAuthenticated(!!token);
    }
  },
  removeToken: () => {
    storeRemoveItem(KEY_TOKEN);
    if (storeInstance) {
      storeInstance.setAuthenticated(false);
    }
  },

  // User management
  getUser: () => {
    if (storeInstance) {
      return storeInstance.currentUser;
    }
    return storeGetItem(KEY_USER);
  },
  setUser: (user) => {
    storeSetItem(KEY_USER, user);
    if (storeInstance) {
      storeInstance.setCurrentUser(user);
    }
  },
  removeUser: () => {
    storeRemoveItem(KEY_USER);
    if (storeInstance) {
      storeInstance.setCurrentUser(null);
    }
  },

  // World management
  getWorld: () => storeGetItem(KEY_WORLD),
  setWorld: (world) => {
    storeSetItem(KEY_WORLD, world);
    if (storeInstance) {
      storeInstance.setCurrentWorld(world);
    }
  },
  removeWorld: () => {
    storeRemoveItem(KEY_WORLD);
    if (storeInstance) {
      storeInstance.setCurrentWorld(null);
    }
  },

  // Authentication state
  isAuthenticated: () => {
    if (storeInstance) {
      return storeInstance.isAuthenticated;
    }
    const token = storeGetItem(KEY_TOKEN);
    return !!token;
  },

  // Clear all auth data
  logout: () => {
    authStore.removeToken();
    authStore.removeUser();
    authStore.removeWorld();
  },
};
