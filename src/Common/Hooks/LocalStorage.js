export const useLocalStorage = (keyName, defaultValue) => {
  const getItem = () => {
    try {
      return JSON.parse(window.localStorage.getItem(keyName));
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  }
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
  };

  return [getItem, setValue];
};