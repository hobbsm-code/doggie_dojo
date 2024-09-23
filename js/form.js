// Local Storage Keys
const USER_DATA_KEY = 'doggieDojoUserData';
const TASK_LIST_KEY = 'doggieDojotaskList';

// Training options for the user to select from
const trainingOptions = ['Potty Training', 'Name Recognition', 'Leash Training', 'Crate Training', 'Behavior Modification',];

// Training tasks for each training option
const pottyTrainingTasks = ['Set a schedule', 'Reward good behavior', 'Clean up accidents', 'Be patient']
const nameRecognitionTasks = ['Use treats', 'Use a clicker', 'Be consistent', 'Be patient']
const leashTrainingTasks = ['Use a harness', 'Use a leash', 'Use treats', 'Be patient']
const crateTrainingTasks = ['Feed in crate', 'Use a blanket', 'Use a toy', 'Be patient']
const behaviorModificationTasks = ['Use positive reinforcement', 'Use a clicker', 'Be patient']

// Form elements
const formElement = document.querySelector('#userForm');
const submitButton = document.querySelector('#submitBtn');
const cancelButton = document.querySelector('#cancelBtn');
const userNameInput = document.querySelector('#username');
const userPasswordInput = document.querySelector('#password');
const dogNameInput = document.querySelector('#dogname');
const dogBreedInput = document.querySelector('#dogbreed');
const activitySelect = document.querySelector('#activity');

// Build user data object from form inputs
const buildUserDataObjectFromInputs = function() {
    const userData = {
        userName: userNameInput.value.trim(),
        userPassword: userPasswordInput.value,
        dogName: dogNameInput.value.trim(),
        dogBreed: dogBreedInput.value.trim(),
        activity: activitySelect.value,
        tasks: setTrainingTasks()
    }
    return userData;
}

// Save user data to local storage
const saveUserData = function() {
    const userData = buildUserDataObjectFromInputs();
    const userDataArray = loadUserDataArray();
    currentUserName = userData.userName;
    userDataArray.push(userData);
    saveToLocalStorage(USER_DATA_KEY, JSON.stringify(userDataArray));
}

// Set the training tasks based on the selected activity
const setTrainingTasks = function() {
    const activity = activitySelect.value;
    let tasks = [];
    switch(activity) {
        case 'Potty Training':
            tasks = pottyTrainingTasks;
            break;
        case 'Name Recognition':
            tasks = nameRecognitionTasks;
            break;
        case 'Leash Training':
            tasks = leashTrainingTasks;
            break;
        case 'Crate Training':
            tasks = crateTrainingTasks;
            break;
        case 'Behavior Modification':
            tasks = behaviorModificationTasks;
            break;
        default:
            tasks = [];
    }
    return tasks;
}

// Save the user data and task list then redirect to the Calendar page
const formSubmit = function (event) {
    event.preventDefault();
    saveUserData();
    redirectPage('calendar.html');
}

// Populate the activity options in the select element
const populateActivityOptions = function() {
    trainingOptions.forEach(function(option) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        activitySelect.appendChild(optionElement);
    });
}

// On form submit, save the user data to local storage and redirect to the calendar page
populateActivityOptions();
formElement.addEventListener('submit', formSubmit);
cancelButton.addEventListener('click', function() {
    redirectPage('index.html');
});