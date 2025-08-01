import { authStore } from "../store/stores/auth";

class ApiService {
  constructor(baseURL = "/api") {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    // Get auth token if available
    const token = authStore.getToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle specific HTTP status codes
      if (response.status === 401) {
        authStore.logout();
        throw response;
      }

      if (response.status === 403) {
        throw response;
      }

      if (response.status === 404) {
        throw response;
      }

      if (response.status === 422) {
        throw response;
      }

      if (response.status >= 500) {
        throw response;
      }

      if (!response.ok) {
        throw response;
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      // Don't re-throw fetch errors (network issues)
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Network error. Please check your connection.");
      }
      
      // Re-throw our custom errors
      if ([401, 403, 404, 422, 500].includes(error.status) ||
          error.message?.includes("Authentication required") || 
          error.message?.includes("Access denied") ||
          error.message?.includes("Resource not found") ||
          error.message?.includes("Validation error") ||
          error.message?.includes("Server error") ||
          error.message?.includes("Network error")) {
        throw error;
      }
      
      // Handle other errors
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }

  // Authentication methods
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store token and user data
    if (response.token) {
      authStore.setToken(response.token);
      authStore.setUser(response.user);
    }

    return response;
  }

  async logout() {
    try {
      await this.request("/auth/logout", { method: "POST" });
    } finally {
      authStore.logout();
    }
  }

  async register(userData) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    // Auto-login after registration if token is provided
    if (response.token) {
      authStore.setToken(response.token);
      authStore.setUser(response.user);
    }

    return response;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return authStore.isAuthenticated();
  }

  // Get current user
  getCurrentUser() {
    return authStore.getUser();
  }

  // Fetch current user profile from server
  async getUserProfile() {
    try {
      const response = await this.request("/auth/profile");
      if (response.user) {
        authStore.setUser(response.user);
      }
      return response.user;
    } catch (error) {
      // If profile fetch fails due to auth issues, logout
      if (error.status === 401) {
        authStore.logout();
      }
      throw error;
    }
  }

  // Task-specific methods with proper error handling
  async getTasks(worldId) {
    if (!worldId) {
      throw new Error("World ID is required");
    }
    return await this.request(`/world/${worldId}/tasks`);
  }

  async updateTaskStatus(worldId, taskId, statusId, oldStatusName, newStatusName) {
    if (!worldId || !taskId || !statusId) {
      throw new Error("World ID, Task ID, and Status ID are required");
    }
    return await this.request(`/world/${worldId}/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ statusId, oldStatusName, newStatusName }),
    });
  }

  async updateStatus(worldId, statusId, data) {
    if (!worldId || !statusId || !data) {
      throw new Error("World ID, Status ID, and data are required");
    }
    return await this.request(`/world/${worldId}/tasks/status/${statusId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
