var itemStorage = 'persist:root'
export const saveUserToLocalStorage = (userData) => {
  localStorage.setItem(itemStorage, JSON.stringify(userData));
};

export const getUserFromLocalStorage = () => {
  const userJSON = localStorage.getItem(itemStorage);
  return userJSON ? parseToJson(userJSON) : null;
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem(itemStorage);
};

const parseToJson = (data) => {
  var parsed = JSON.parse(data)
  try {
    parsed.admin = JSON.parse(parsed.admin);
  } catch (error) {
    parsed.admin = parsed.admin
  }

  try {
    parsed._persist = JSON.parse(parsed._persist);
  } catch (error) {
    parsed._persist = parsed._persist; 
  }
  return parsed
}