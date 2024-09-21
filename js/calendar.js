const TASK_TRACKER_KEY = 'taskTracker';
const dayCount = 30;
const userData = JSON.parse(localStorage.getItem('userData'));
const tasks = JSON.parse(localStorage.getItem('tasks'));
const tasksList = document.getElementById('#days');
const userName = localStorage.getItem('userName');
const calendar = document.getElementById('calendar');



// Get the user's tasks from local storage
const getUserTasks = function (userName) {
    userIndex = getUserIndexFromUserName(userName);
    if (userIndex === null) {
        console.log("User not found: " + userName);
        return [];
    }
    return userData[userIndex].tasks;
}

// Set a user's task for a day to true
const completeTask = function (userName, day, task) {
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
    const taskTracker = getUserObjectFromUserName(userName).taskTracker;
    return taskTracker ? taskTracker : [];
}

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
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let divTag = "";

    for (let i =1; i <= lastDateofMonth; i++) {
        divTag += `<div>${i}</div>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = divTag;
};

renderCalendar();

prevNextIcons.forEach(icon => { 
    icon.addEventListener('click', () => { 
      currMonth = iconid === 'prev' ? currMonth - 1 : currMonth + 1;
    })
});