import { storeGetItem, storeSetItem, storeRemoveItem } from "../utils.jsx";

const AUTH_TOKEN_KEY = "auth-token";
const USER_KEY = "user";

export const authStore = {
  // Token management
  getToken: () => storeGetItem(AUTH_TOKEN_KEY),
  setToken: (token) => storeSetItem(AUTH_TOKEN_KEY, token),
  removeToken: () => storeRemoveItem(AUTH_TOKEN_KEY),

  // User management
  getUser: () => storeGetItem(USER_KEY),
  setUser: (user) => storeSetItem(USER_KEY, user),
  removeUser: () => storeRemoveItem(USER_KEY),

  // Authentication state
  isAuthenticated: () => {
    const token = storeGetItem(AUTH_TOKEN_KEY);
    return !!token;
  },

  // Clear all auth data
  logout: () => {
    authStore.removeToken();
    authStore.removeUser();
  },
};
