const localStorageHelper = {
  setItemWithExpiration: (key, value, expirationDate) => {
    const item = {
      value: value,
      expiration: expirationDate.toISOString()
    };

    window.localStorage.setItem(key, JSON.stringify(item));
  },

  getItemWithExpiration: (key) => {
    const itemStr = window.localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Si el item ha expirado, eliminarlo de localStorage
    if (now.getTime() > new Date(item.expiration).getTime()) {
      window.localStorage.removeItem(key);
      return null;
    }

    return item.value;
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);
  }
};

export default localStorageHelper;
