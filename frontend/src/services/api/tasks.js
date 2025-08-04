const tasks = {
  getTasks: async (api, worldId) => {
    if (!worldId) {
      throw new Error("World ID is required");
    }
    return await api.request(`/world/${worldId}/tasks`);
  },

  createTask: async (api, worldId, data) => {
    if (!worldId || !data) {
      throw new Error("World ID and data are required");
    }
    return await api.request(`/world/${worldId}/tasks/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateTask: async (api, worldId, taskId, data) => {
    if (!worldId || !taskId || !data) {
      throw new Error("World ID, Task ID, and data are required");
    }
    return await api.request(`/world/${worldId}/tasks/${taskId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  updateTaskStatus: async (api, worldId, taskId, statusId, oldStatusName, newStatusName) => {
    if (!worldId || !taskId || !statusId) {
      throw new Error("World ID, Task ID, and Status ID are required");
    }
    return await api.request(`/world/${worldId}/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ statusId, oldStatusName, newStatusName }),
    });
  },

  deleteTask: async (api, worldId, taskId) => {
    if (!worldId || !taskId) {
      throw new Error("World ID and Task ID are required");
    }
    return await api.request(`/world/${worldId}/tasks/${taskId}/delete`, {
      method: "DELETE",
    });
  },

  createTasksStatus: async (api, worldId, data) => {
    if (!worldId || !data) {
      throw new Error("World ID and data are required");
    }
    return await api.request(`/world/${worldId}/tasks/status/create`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateTasksStatus: async (api, worldId, statusId, data) => {
    if (!worldId || !statusId || !data) {
      throw new Error("World ID, Status ID, and data are required");
    }
    return await api.request(`/world/${worldId}/tasks/status/${statusId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

export default tasks; 