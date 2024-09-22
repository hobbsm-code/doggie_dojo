

const saveToLocalStorage = function(key, value) {
    localStorage.setItem(key, value);
}

const loadFromLocalStorage = function(key) {
    return localStorage.getItem(key);
}; 

let redirectURL = '';

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

// Load user data from local storage
const loadUserDataArray = function() {
  let userData = loadFromLocalStorage("doggieDojoUserData");
  if(userData === null || Array.length === 0) {
      userData = [];
  } else {
      userData = JSON.parse(userData);
      if(!Array.isArray(userData)) {
          userData = [userData];
      }
  }
  return userData;
}

const getUserObjectFromUserName = function (userName) {
  const userData = loadUserDataArray();
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userName === userName) {
      return userData[i];
    }
  }
  return null;
}

const getUserIndexFromUserName = function (userName) {
  const userData = loadUserDataArray();
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].userName === userName) {
      return i;
    }
  }
  return null;
}

const replaceUserInArray = function(userName, newUserData) {
  const userData = loadUserDataArray();
  const userIndex = getUserIndexFromUserName(userName);
  if (userIndex !== null) {
    userData[userIndex] = newUserData;
    saveToLocalStorage(USER_DATA_KEY, JSON.stringify(userData));
  }
};

