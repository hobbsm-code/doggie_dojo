const USER_DATA_KEY = 'doggieDojoUserData';

const formElement = document.querySelector('#userForm');
const submitButton = document.querySelector('#submitBtn');
const cancelButton = document.querySelector('#cancelBtn');
const userNameInput = document.querySelector('#username');
const dogNameInput = document.querySelector('#dogname');
const dogBreedInput = document.querySelector('#dogbreed');
const activitySelect = document.querySelector('#activity');

const buildUserDataObjectFromInputs = function() {
    const userData = {
        userName: userNameInput.value,
        dogName: dogNameInput.value,
        dogBreed: dogBreedInput.value,
        activity: activitySelect.value
    }
    return userData;
}

const loadUserDataArray = function() {
    const userData = loadFromLocalStorage(USER_DATA_KEY);
    if(!userData) {
        userData = [];
    } else {
        userData = JSON.parse(userData);
        if(!Array.isArray(userData)) {
            userData = [userData];
        }
    }
    return userData;
}

const saveUserData = function() {
    const userData = buildUserDataObjectFromInputs();
    saveToLocalStorage(USER_DATA_KEY, JSON.stringify(userData));
}

const formSubmit = function (event) {
    event.preventDefault();
    saveUserData();
    redirectPage('calendar.html');
}

// On form submit, save the user data to local storage and redirect to the calendar page
formElement.addEventListener('submit', formSubmit);
cancelButton.addEventListener('click', function() {
    redirectPage('index.html');
});