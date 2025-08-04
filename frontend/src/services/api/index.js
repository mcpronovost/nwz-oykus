import { authStore } from "../store/stores/auth";
import health from "./health";

class ApiService {
  constructor(baseURL = import.meta.env.VITE_API_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    // In development, use relative URLs for proxy
    const url = import.meta.env.DEV ? `/api${endpoint}` : `${this.baseURL}${endpoint}`;

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
      if (response.status === 204) {
        return { status: 204 };
      }

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
      throw error;
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

  // Health methods
  async getHealth() {
    return await health.getHealth(this);
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

  async createTask(worldId, data) {
    if (!worldId || !data) {
      throw new Error("World ID and data are required");
    }
    return await this.request(`/world/${worldId}/tasks/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTask(worldId, taskId, data) {
    if (!worldId || !taskId || !data) {
      throw new Error("World ID, Task ID, and data are required");
    }
    return await this.request(`/world/${worldId}/tasks/${taskId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
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

  async deleteTask(worldId, taskId) {
    if (!worldId || !taskId) {
      throw new Error("World ID and Task ID are required");
    }
    return await this.request(`/world/${worldId}/tasks/${taskId}/delete`, {
      method: "DELETE",
    });
  }

  async createTasksStatus(worldId, data) {
    if (!worldId || !data) {
      throw new Error("World ID and data are required");
    }
    return await this.request(`/world/${worldId}/tasks/status/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTasksStatus(worldId, statusId, data) {
    if (!worldId || !statusId || !data) {
      throw new Error("World ID, Status ID, and data are required");
    }
    return await this.request(`/world/${worldId}/tasks/status/${statusId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
