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