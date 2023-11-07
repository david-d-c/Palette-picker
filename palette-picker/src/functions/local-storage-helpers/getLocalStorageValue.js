export const getLocalStorageValue = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    }
    catch (err) {
      console.error(err)
      return null
    }
  }