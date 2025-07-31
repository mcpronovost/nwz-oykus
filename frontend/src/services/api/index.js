import { authStore } from "@/services/store/stores/auth";

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
        throw new Error("Authentication required. Please log in again.");
      }

      if (response.status === 403) {
        throw new Error("Access denied. You don't have permission to perform this action.");
      }

      if (response.status === 404) {
        throw new Error("Resource not found. The requested data doesn't exist.");
      }

      if (response.status === 422) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Validation error. Please check your input.");
      }

      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
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
      if (error.message.includes("Authentication required") || 
          error.message.includes("Access denied") ||
          error.message.includes("Resource not found") ||
          error.message.includes("Validation error") ||
          error.message.includes("Server error") ||
          error.message.includes("Network error")) {
        throw error;
      }
      
      // Handle other errors
      console.error("API request failed:", error);
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
    } catch (error) {
      // Even if logout fails on server, clear local data
      console.warn("Server logout failed, clearing local data:", error);
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

  // Task-specific methods with proper error handling
  async getTasks(worldId) {
    try {
      if (!worldId) {
        throw new Error("World ID is required");
      }
      return await this.request(`/world/${worldId}/tasks`);
    } catch (error) {
      throw new Error(`Failed to load tasks: ${error.message}`);
    }
  }

  async updateTaskStatus(worldId, taskId, statusId) {
    try {
      if (!worldId || !taskId || !statusId) {
        throw new Error("World ID, Task ID, and Status ID are required");
      }
      return await this.request(`/world/${worldId}/tasks/${taskId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ statusId }),
      });
    } catch (error) {
      throw new Error(`Failed to update task status: ${error.message}`);
    }
  }

  async updateStatus(worldId, statusId, data) {
    try {
      if (!worldId || !statusId || !data) {
        throw new Error("World ID, Status ID, and data are required");
      }
      return await this.request(`/world/${worldId}/tasks/status/${statusId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } catch (error) {
      throw new Error(`Failed to update status: ${error.message}`);
    }
  }
}

export const api = new ApiService();
