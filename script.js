let logText = '';
let addTaskBtn = document.querySelector('.new-task__button')
let taskTextValue = document.querySelector('.new-task-text')
let taskDateDeadline = document.querySelector('.new-task-date')
let doneTaskList = !localStorage.doneTaskList ? [] : JSON.parse(localStorage.getItem('doneTaskList'))
let toDoTaskList = !localStorage.toDoTaskList ? [] : JSON.parse(localStorage.getItem('toDoTaskList'))
let deletedTaskList = !localStorage.deletedTaskList ? [] : JSON.parse(localStorage.getItem('deletedTaskList'))
let log = !localStorage.log ? [] : JSON.parse(localStorage.getItem('log'))


function dateFormat(date = new Date()) {
    return date ? date.toLocaleString() : new Date().toLocaleString()
}


//TASK CONSTRUCTOR
function Task(taskText, taskDeadline) {
    this.id = Date.now();
    this.taskText = taskText || '...';
    this.taskDeadline = dateFormat(taskDeadline);
    this.date = dateFormat();
    this.checked = false;
    this.color = '';
}

// UPDATE LOCALSTORAGE
function storageRefresh() {
    localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
    localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList));
    localStorage.setItem('deletedTaskList', JSON.stringify(deletedTaskList));
    localStorage.setItem('log', JSON.stringify(log))
}


// Change TASK COLOR
function deadliner(array) {
    array.forEach(function (item) {
        let deadlineTime = Date.parse(item.taskDeadline)
        let currentTime = Date.parse(dateFormat())
        if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
            item.color = 'yellow'
            logText = `Deadline on task with id: ${item.id} will expired at ${item.taskDeadline}`
            logger()
        }
        if (deadlineTime - currentTime < 0) {
            item.color = 'red'
            logText = `Deadline on task with id: ${item.id} was expired at ${item.taskDeadline}`
            logger()
        }
    })
}

deadliner(toDoTaskList)
deadliner(doneTaskList)

// TASK CREATOR
const createTask = (task) => {
    return `<div class="task" id="${task.id}" title = "${task.taskText}" style="background: ${task.color}" tabindex="0" draggable="true" onclick="focus()">
            <div class="closed-button__container">
                <button class="closed-button" onclick="deleter(${task.id})">X</button>
            </div>
            <div class="task-date">
                <span class="create-date">Дата создания задачи: ${task.date} </span>
            </div>
            <div class="task-deadline">
                <span class="deadline-date">Дата выполнения задачи: ${task.taskDeadline}</span>
            </div>
            <div class="task-text__block">
                <p class="task-text" tabindex="0">${task.taskText}</p>
            </div>
            <div class="task-status">
                <span class="status-text">DONE:</span>
                <input onclick='doneTask(${task.id})' type="checkbox" class="status-check" ${task.checked ? 'checked' : ''}>
            </div>
        </div>`
}


// CHANGE TASK STATUS
const doneTask = function (id) {
    const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
    const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
    if (currentItemIndex1 !== -1) {
        toDoTaskList[currentItemIndex1].checked = !toDoTaskList[currentItemIndex1].checked
        logText = `Task with id: ${id} moved to done at ${dateFormat()}`
        logger()
    }
    if (currentItemIndex2 !== -1) {
        doneTaskList[currentItemIndex2].checked = !doneTaskList[currentItemIndex2].checked
        logText = `Task with id: ${id} moved to undone at ${dateFormat()}`
        logger()
    }
    arrayFilters()
    doneTaskMaker()
    taskMaker()
    storageRefresh()
    dragEnabler()
}


// FILTER ARRAYS
function arrayFilters() {
    toDoTaskList.forEach(function (item) {
        if (item.checked) {
            doneTaskList.push(item)
            toDoTaskList = toDoTaskList.filter((item) => !item.checked)
        }
    })
    doneTaskList.forEach(function (item) {
        if (!item.checked) {
            toDoTaskList.push(item)
            doneTaskList = doneTaskList.filter((item) => item.checked)
        }
    })
}


//SORTED FUNCTION
const ascSort = function () {
    toDoTaskList.sort((a, b) => Date.parse(a.taskDeadline) - Date.parse(b.taskDeadline))
    storageRefresh();
    taskMaker();
}

const descSort = function () {
    toDoTaskList.sort((a, b) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
    storageRefresh();
    taskMaker();
}


// TODOTASK RENDER FUNC
function taskMaker() {
    let toDoTasks = document.querySelector('.undone-tasks__container')
    toDoTasks.innerHTML = '';
    if (toDoTaskList.length > 0) {
        toDoTaskList.forEach(function (item) {
            toDoTasks.innerHTML += createTask(item);
        })
    }
}

// DONETASK RENDER FUNC
function doneTaskMaker() {
    let DoneTasks = document.querySelector('.done-tasks__container')
    DoneTasks.innerHTML = '';
    if (doneTaskList.length > 0) {
        doneTaskList.forEach(function (item) {
            DoneTasks.innerHTML += createTask(item);
        })
    }
}

//DELETEDTASK RENDER FUNC
function deletedTaskMaker() {
    let deletedTasks = document.querySelector('.deleted__tasks__container')
    deletedTasks.innerHTML = '';
    if (deletedTaskList.length > 0) {
        deletedTaskList.forEach(function (item) {
            deletedTasks.innerHTML += createTask(item);
        })
    }
}


//NEW TASK CREATOR
addTaskBtn.addEventListener('click', function () {
    toDoTaskList.push(new Task(taskTextValue.value, new Date(taskDateDeadline.value)))
    logText = `Created new task with id: ${Date.now()}, text: ${taskTextValue.value}, deadline Date: ${dateFormat(new Date(taskDateDeadline.value))} at ${dateFormat()}`
    storageRefresh();
    taskMaker();
    logger()
    taskTextValue.value = '';
    taskDateDeadline.value = '';


})

// TASK REPLACER ON DELETE BLOCK
const deleter = function (id) {
    let deletedDate = Date.now()
    const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
    const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
    const deletedItemIndex = deletedTaskList.findIndex(item => item.id === id)
    if (currentItemIndex1 !== -1) {
        toDoTaskList[currentItemIndex1].deletedDate = deletedDate;
        logText = `Task with id: ${toDoTaskList[currentItemIndex1].id} mark to delete at ${dateFormat()}`
        logger()
        deletedTaskList.push(toDoTaskList[currentItemIndex1]);
        toDoTaskList.splice(currentItemIndex1, 1)
    }
    if (currentItemIndex2 !== -1) {
        doneTaskList[currentItemIndex2].deletedDate = deletedDate;
        logText = `Task with id: ${doneTaskList[currentItemIndex2].id} mark to delete at ${dateFormat()}`
        logger()
        deletedTaskList.push(doneTaskList[currentItemIndex2]);
        doneTaskList.splice(currentItemIndex2, 1)
    }

    deletedTaskList.sort((a, b) => b.deletedDate - a.deletedDate)
    doneTaskMaker()
    taskMaker()
    deletedTaskMaker()
    dragEnabler()
    storageRefresh()

    if (deletedItemIndex !== -1) {
        let confirmation = confirm('Are you right?')
        if (confirmation) {
            logText = `Task with id: ${deletedTaskList[deletedItemIndex].id} deleted at ${dateFormat()}`
            logger()
            deletedTaskList[deletedItemIndex].onDelete = true;
            const taskOnDelete = document.getElementById(deletedTaskList[deletedItemIndex].id)
            taskOnDelete.classList.toggle('deleted')
            setTimeout(() => {
                deletedTaskList = deletedTaskList.filter((item) => item.id !== id)
                deletedTaskList.sort((a, b) => b.deletedDate - a.deletedDate)
                deletedTaskMaker()
                storageRefresh()
            }, 300);
        }
    }

}


//CHANGE TEXT INPUT
document.addEventListener('click', function (event) {
    event.target.focus()
})

document.addEventListener('dblclick', textChanger)
/*document.addEventListener('focusin', function (event) {
    if (event.target.className === 'task-text') textChanger()
})*/
document.addEventListener('keydown', function () {
    if (event.keyCode === 13) textChanger()

})

function textChanger() {
    if (event.target.className === 'task-text' && event.target.parentElement.parentElement.parentElement.className === 'undone-tasks__container') {
        let id = event.target.closest('.task').id;
        let targetIndex = toDoTaskList.findIndex(item => item.id === Number(id))
        event.target.style.display = 'none'
        let task = event.target.closest('.task')
        let input = document.createElement('input')
        input.value = toDoTaskList[targetIndex].taskText
        task.append(input)
        input.click()
            function doneChange () {
                toDoTaskList[targetIndex].taskText = input.value
                logText = `Text on task id =${toDoTaskList[targetIndex].id} was changed to ${toDoTaskList[targetIndex].taskText} at ${dateFormat()}`
                logger()
                if (toDoTaskList[targetIndex].taskText === '') toDoTaskList[targetIndex].taskText = '...'
                event.target.style.display = 'inline'
                taskMaker()
                storageRefresh()
            }
        input.addEventListener('blur', doneChange)
        input.addEventListener('keydown', function () {
            if (event.keyCode === 13) doneChange()
        })

    }
}

taskMaker()
doneTaskMaker()
deletedTaskMaker()
dragEnabler ()

//KEYBOARD EVENTS

const tasksNavigate = document.getElementsByClassName('task');
let navigateIndex = 0;
tasksNavigate[navigateIndex] ? tasksNavigate[navigateIndex].focus() : '';
document.addEventListener('keydown', function (event) {
    event = event || window.event;
    if (event.target.className === 'task') {
        let id = Number(event.target.id);
        switch (event.keyCode) {
            case 38:
                if (navigateIndex > 0) {
                    tasksNavigate[--navigateIndex].focus();
                }
                break
            case 40:
                if (navigateIndex < tasksNavigate.length) {
                    tasksNavigate[++navigateIndex].focus();
                }
                break;
            case 46: {
                deleter(id)
            }
                break
        }
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container') {
            doneTask(id)
        }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container') {
            doneTask(id)
        }
        if (event.keyCode === 69) {
            event.target.childNodes[7].firstElementChild.click()
            textChanger()

        }
    }
})


//LOGGER
function logger() {
    console.log(logText)
    log.push(logText)
}

//ACCORDEON OPEN
function openBlock() {
    const block = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('extended')
}


// DRAG N DROP


const doneTaskContainer = document.querySelector('.done-tasks');
const unDoneTaskContainer = document.querySelector('.undone-tasks');
const containers = [doneTaskContainer, unDoneTaskContainer]

containers.forEach(container => {
    container.addEventListener('dragenter', function (event) {
        event.preventDefault()
    })
    container.addEventListener('dragover', function (event) {
        event.preventDefault()
    })
})


unDoneTaskContainer.addEventListener('drop', function (event) {
    let id = Number(event.dataTransfer.getData('id'))
    let targetIndex = doneTaskList.findIndex(item => item.id === Number(id))
    let targetItem = doneTaskList[targetIndex]
        if (targetItem.checked) {
            doneTask(id)
            storageRefresh()
            doneTaskMaker()
            taskMaker()
            dragEnabler()
        }
})

doneTaskContainer.addEventListener('drop', function (event){
    let id = Number(event.dataTransfer.getData('id'))
    let targetIndex = toDoTaskList.findIndex(item => item.id === Number(id))
    let targetItem = toDoTaskList[targetIndex]
    if (!targetItem.checked) {
        doneTask(id)
        storageRefresh()
        doneTaskMaker()
        taskMaker()
        dragEnabler()
    }
})



function dragEnabler () {
    const draggableTasks = document.querySelectorAll('.task')
    draggableTasks.forEach(dragItem => {
        dragItem.addEventListener('dragstart', function (event) {
            event.target.classList.add('task-dragged')
            event.dataTransfer.setData('id', event.target.id)
        })
        dragItem.addEventListener('dragend', function (event) {
            event.target.classList.remove('task-dragged')
        })
    })
}



//DOWNLOAD FUNCTIONS
function downloadTasks() {
    let tasks = new Blob(['Невыполненные задачи:', JSON.stringify(toDoTaskList), 'Выполненные задачи:', JSON.stringify(doneTaskList), 'Задачи на удаление:', JSON.stringify(deletedTaskList)], {type: 'text/plain'});
    let a = document.querySelector('.downloadTaskList')
    a.href = URL.createObjectURL(tasks);
}

function downloadLogs() {
    let blob = new Blob([JSON.stringify(log)], {type: 'text/plain'});
    let a = document.querySelector('.downloadLogs')
    a.href = URL.createObjectURL(blob);
}









