const TASK_TRACKER_KEY = 'taskTracker';
const dayCount = 30;
const userData = JSON.parse(localStorage.getItem('doggieDojoUserData'));
const tasks = JSON.parse(localStorage.getItem('setTrainingTasks'));
const tasksList = document.getElementById('#days');
const userName = JSON.parse(localStorage.getItem('getUserObjectFromUserName'));
const calendar = document.getElementById('calendar');

const userNameInput = document.querySelector('#username');
const userIndex = getUserIndexFromUserName(userName);

// Get the user's tasks from local storage
const getUserTasks = function (userName) {
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
        if (userTaskTracker[i].day === day && userTaskTracker[i].task === task) {
            userTaskTracker[i].completed = true;
        }
    }
    user.taskTracker = userTaskTracker;
    replaceUserInArray(userName, user);
}

// Get the user's task tracker from local storage
const getUserTaskTracker = function (userName) {
    userIndex = getUserIndexFromUserName(userName);
    if (userIndex === null) {
        return null;
    } else {
        return userData[userIndex].taskTracker;
    }
}

// Get the user's task tracker from local storage

// Build a task tracker for a user if one does not already exist
const buildTaskTracker = function (userName) {
    const userTaskTracker = getUserTaskTracker(userName);
    if (userTaskTracker) {
        console.log("Task tracker already exists for user: " + userName);
        return;
    } else {
        let user = getUserObjectFromUserName(userName);
        let tasks = user.tasks;
        let taskTracker = [];
        if (tasks.length === 0) {
            console.log("No tasks found for user: " + userName);
            return;
        }
        for (let i = 0; i < dayCount; i++) {
            for (let j = 0; j < tasks.length; j++) {
                let dailyTask = {
                    day: i + 1,
                    task: tasks[j],
                    completed: false
                }
                taskTracker.push(dailyTask);
            }
        }
        user[TASK_TRACKER_KEY] = taskTracker;
        replaceUserInArray(userName, user);
    }
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
        divTag += `<div>${i}</div>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        divTag += `<div class="inactive">${i - lastDayofMonth + 1}</div>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = divTag;
};

renderCalendar();

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
        renderCalendar();
    })
});

const tasksButton = document.querySelector('.days');
addTasksCloseBtn = document.querySelector('.close');
const tasksBar = document.getElementById('#bar');
addTasksTitle = document.querySelector('title');
addTasks = document.querySelector('.add-tasks');
addTodaysDate = document.querySelector('.todays-date');

addTasksCloseBtn.addEventListener('click', () => {
    tasksBar.classList.remove('active');
});

tasksButton.addEventListener('click', (e) => {
    const tasks = JSON.parse(localStorage.getItem('setTrainingTasks'));
    if (e.target.tagName === 'DIV') {
        let tasksHTML = 'tasks';

        for (let i = 0; i < tasks; i++) {
            tasksHTML += `<div class="task">
            <input type="checkbox" id="${tasks[i]}" name="${tasks[i]}">
            <label for="${tasks[i]}">${tasks[i]}</label>
            </div>`;
        }

    }
});

///taskButton to hide and show the task bar
const taskButton = document.querySelector('.task-button');
taskButton.addEventListener('click', (e) => {
    if (e.target.tagname === 'Div') {
    tasksBar.classList.add('active');
    }
    else {
        tasksBar.classList.remove('active');
    }
});




