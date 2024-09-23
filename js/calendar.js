const TASK_TRACKER_KEY = 'taskTracker';
const dayCount = 30;
let currentUser;
let currentUserTaskTracker;
const userData = JSON.parse(localStorage.getItem('doggieDojoUserData'));
const tasks = JSON.parse(localStorage.getItem('setTrainingTasks'));
const tasksList = document.getElementById('#days');
const userName = JSON.parse(localStorage.getItem('getUserObjectFromUserName'));
const calendar = document.getElementById('calendar');

const userNameInput = document.querySelector('#username');
let userIndex = getUserIndexFromUserName(userName);

// Get the user's tasks from local storage
function getUserTasks(userName) {
    userIndex = getUserIndexFromUserName(userName);
    if (userIndex === null) {
        return null;
    }
    else {
        return userData[userIndex].tasks;
    }
}

// Set a user's task for a day to true
function completeTask(userName, day, task) {
    let user = getUserObjectFromUserName(userName);
    let userTaskTracker = user.taskTracker;
    for (let i = 0; i < userTaskTracker.length; i++) {
        if (userTaskTracker[i].day == day && userTaskTracker[i].task == task) {
            userTaskTracker[i].completed = true;
        }
    }
    user.taskTracker = userTaskTracker;
    replaceUserInArray(userName, user);
}

// Set a user's task for a day to false
function uncompleteTask(userName, day, task) {
    let user = getUserObjectFromUserName(userName);
    let userTaskTracker = user.taskTracker;
    for (let i = 0; i < userTaskTracker.length; i++) {
        if (userTaskTracker[i].day == day && userTaskTracker[i].task == task) {
            userTaskTracker[i].completed = false;
        }
    }
    user.taskTracker = userTaskTracker;
    replaceUserInArray(userName, user);
}

// Get the user's task tracker from local storage
function getUserTaskTracker(userName) {
    const userDataArray = loadUserDataArray();
    const userIndex = getUserIndexFromUserName(userName);
    if (userIndex === null) {
        return null;
    } else {
        return userDataArray[userIndex].taskTracker;
    }
}

function getUserTaskStatusForDay (userName, day) {
    let userTaskTracker = getUserTaskTracker(userName);
    let taskStatus = [];
    for (let i = 0; i < userTaskTracker.length; i++) {
        if (userTaskTracker[i].day == day) {
            taskStatus.push(userTaskTracker[i]);
        }
    }
    return taskStatus;
}

// Build a task tracker for a user if one does not already exist
const buildTaskTracker = function (userName) {
    let userTaskTracker = getUserTaskTracker(userName);
    if (userTaskTracker) {
        console.log("Task tracker already exists for user: " + userName);
    } else {
        let user = getUserObjectFromUserName(userName);
        let tasks = user.tasks;
        let userTaskTracker = [];
        if (tasks.length === 0) {
            console.log("No tasks found for user: " + userName);
        }
        for (let i = 0; i < dayCount; i++) {
            for (let j = 0; j < tasks.length; j++) {
                let dailyTask = {
                    day: i + 1,
                    task: tasks[j],
                    completed: false
                }
                userTaskTracker.push(dailyTask);
            }
        }
        user[TASK_TRACKER_KEY] = userTaskTracker;
        replaceUserInArray(userName, user);
    }
    return userTaskTracker;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
console.log(months[0]);
const currentDate = document.querySelector('.date');
daysTag = document.querySelector('.days');
prevNextIcons = document.querySelectorAll('.icons span');

let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const renderCalendar = () => {
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let divTag = "";

    for (let i = firstDateofMonth; i > 0; i--) {
        divTag += `<div class="inactive">${lastDateofLastMonth - i + 1}</div>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        divTag += `<div class="calendarDay" id="${i}">${i}</div>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        divTag += `<div class="inactive">${i - lastDayofMonth + 1}</div>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = divTag;
};

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
        renderCalendar();
    })
});

const tasksButton = document.querySelector('.calendarDay');
const daysWrapper = document.querySelector('.days');
addTasksCloseBtn = document.querySelector('.close');
const tasksBar = document.querySelector('.bar');
addTasksTitle = document.querySelector('title');
addTasks = document.querySelector('.add-tasks');
const addTasksWrapper = document.querySelector('.add-tasks-wrapper');
addTodaysDate = document.querySelector('.todays-date');

currentUserName = 'Butch';

window.onload = function() {
    currentUser = getUserObjectFromUserName(currentUserName);
    currentUserTaskTracker = buildTaskTracker(currentUserName);
    hideTasksBar();
    renderCalendar();
}

const removeTasksFromDom = function() { 
    if(addTasksWrapper.hasChildNodes()) {
        while (addTasksWrapper.firstChild) {
            addTasksWrapper.removeChild(addTasksWrapper.firstChild);
        }
    }
}

function hideTasksBar() {
    tasksBar.style.width = 0;
    document.querySelector('.bar').setAttribute('hidden', true);
    document.querySelector('.taskbar').setAttribute('hidden', true);
    document.querySelector('.task').setAttribute('hidden', true);
    document.querySelector('.tasks').setAttribute('hidden', true);
    document.querySelector('.task > .month').setAttribute('hidden', true);
    document.querySelector('.add-tasks-title').setAttribute('hidden', true);
    document.querySelector('.close').setAttribute('hidden', true);
}

function unhideTasksBar() {
    tasksBar.style.width = '250px';
    document.querySelector('.bar').removeAttribute('hidden');
    document.querySelector('.taskbar').removeAttribute('hidden');
    document.querySelector('.task').removeAttribute('hidden');
    document.querySelector('.tasks').removeAttribute('hidden');
    document.querySelector('.task > .month').removeAttribute('hidden');
    document.querySelector('.add-tasks-title').removeAttribute('hidden');
    document.querySelector('.close').removeAttribute('hidden');
}


addTasksCloseBtn.addEventListener('click', () => {
    removeTasksFromDom();
    hideTasksBar();
});

daysWrapper.addEventListener('click', (e) => {
    removeTasksFromDom();
    const day = e.target.id;
    const currentDayTasks = getUserTaskStatusForDay(currentUserName, day);
    unhideTasksBar();
    addTasksToDOM(currentDayTasks);

});

const addTasksToDOM = function(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
        const task = taskArray[i].task;
        const status = taskArray[i].completed;
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.style.paddingLeft = '5px';
        const inputElement = document.createElement('input');
        inputElement.type = 'checkbox';
        inputElement.id = task;
        inputElement.dataset.day = taskArray[i].day;
        inputElement.name = task;
        inputElement.checked = status;
        const labelElement = document.createElement('label');
        labelElement.for = task;
        labelElement.textContent = task;
        labelElement.style.padding = '5px';
        taskElement.appendChild(inputElement);
        taskElement.appendChild(labelElement);
        addTasksWrapper.appendChild(taskElement);
    }
}

$(document).on('click', '.task input', function() {
    const task = $(this).attr('id');
    const day = $(this).attr('data-day');
    if ($(this).prop('checked')) {
        completeTask(currentUserName, day, task);
    } else {
        uncompleteTask(currentUserName, day, task);
    }
}
);

