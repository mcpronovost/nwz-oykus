const health = {
  getHealth: async (api) => {
    try {
      const response = await api.request("/health");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default health;
