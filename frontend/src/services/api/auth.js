const auth = {
  login: async (api, credentials) => {
    const response = await api.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store token and user data
    if (response.token) {
      api.authStore.setToken(response.token);
      api.authStore.setUser(response.user);
    }

    return response;
  },

  logout: async (api) => {
    try {
      await api.request("/auth/logout", { method: "POST" });
    } finally {
      api.authStore.logout();
    }
  },

  register: async (api, userData) => {
    const response = await api.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    // Auto-login after registration if token is provided
    if (response.token) {
      api.authStore.setToken(response.token);
      api.authStore.setUser(response.user);
    }

    return response;
  },

  getUserProfile: async (api) => {
    try {
      const response = await api.request("/auth/me");
      if (response.user) {
        api.authStore.setUser(response.user);
      }
      return response.user;
    } catch (e) {
      // If profile fetch fails due to auth issues, logout
      if (e.status === 401) {
        api.authStore.logout();
      }
      throw e;
    }
  },
};

export default auth; 