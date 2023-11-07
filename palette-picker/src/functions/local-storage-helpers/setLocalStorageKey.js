export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }