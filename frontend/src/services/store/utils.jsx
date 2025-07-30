export const storeGetItem = (key) => {
  const encodedAppStore = localStorage.getItem(`oyk-${key}`);
  return encodedAppStore ? JSON.parse(encodedAppStore) : null;
};

export const storeSetItem = (key, value) => {
  localStorage.setItem(`oyk-${key}`, JSON.stringify(value));
};
