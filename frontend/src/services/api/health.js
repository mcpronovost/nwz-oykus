const health = {
  getHealth: async (api) => {
    return await api.request("/health");
  },
};

export default health;
