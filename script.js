
document.addEventListener('DOMContentLoaded', function() {


    let addTaskBtn = document.querySelector('.new-task__button')
    let taskTextValue = document.querySelector('.new-task-text')
    let taskDateDeadline = document.querySelector('.new-task-date')
    let doneTaskList = !localStorage.doneTaskList ? [] : JSON.parse(localStorage.getItem('doneTaskList'))
    console.log(doneTaskList)
    let counter = !localStorage.counter ? 0 : JSON.parse(localStorage.getItem('counter'));
    let toDoTaskList = !localStorage.toDoTaskList ? [] : JSON.parse(localStorage.getItem('toDoTaskList'))
    let deletedTaskList = !localStorage.deletedTaskList ? [] : JSON.parse(localStorage.getItem('deletedTaskList'))
    //!localStorage.toDoTaskList ? toDoTaskList = [] : toDoTaskList = JSON.parse(localStorage.getItem('toDoTaskList'))



    //TASK CONSTRUCTOR
    function Task(taskText, taskDeadline) {
        this.id = Date.now();
        this.taskText = taskText;
        this.taskDeadline = taskDeadline;
        this.date = new Date().toString();
        this.checked = false;
        this.color = '';
    }

    // UPDATE LOCALSTORAGE
    function storageRefresh() {
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
        localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList))
        localStorage.setItem('deletedTaskList', JSON.stringify(deletedTaskList))
        localStorage.setItem('counter', JSON.stringify(counter))
    }


// Change TASK COLOR
    function deadliner(array) {
        array.forEach(function (item) {
            let deadlineTime = Date.parse(item.taskDeadline)
            let currentTime = Date.now()
            if (deadlineTime - currentTime < 3600000) {
                console.log('MON')
                item.color = 'yellow'
                console.log(item)
            }
            if (deadlineTime - currentTime < 0) {
                item.color = 'red'
            }
        })
    }

    deadliner(toDoTaskList)
    deadliner(doneTaskList)




    // TASK CREATOR
    const createTask = (task) => {
        return `<div class="task" id="${task.id}" title = "${task.taskText}" draggable="true" style="background: ${task.color}" tabindex="0">
            <div class="closed-button__container">
                <button class="closed-button" onclick="deleter(${task.id})">X</button>
            </div>
            <div class="task-date">
                <span class="create-date">Дата создания задачи: ${task.date} </span>
            </div>
            <div class="task-deadline">
                <span class="deadline-date">${task.taskDeadline}</span>
            </div>
            <div class="task-text__block">
                <div class="task-text-overlay">${task.taskText}</div>
                <p class="task-text">${task.taskText}</p>
            </div>
            <div class="task-status">
                <span class="status-text">DONE:</span>
                <input onclick='doneTask(${task.id})' type="checkbox" class="status-check" ${task.checked ? 'checked' : ''}>
            </div>
        </div>`
    }


    // CHANGE TASK STATUS
    doneTask = function (id) {
            const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
            const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
            if (currentItemIndex1 !== -1) {
                toDoTaskList[currentItemIndex1].checked = !toDoTaskList[currentItemIndex1].checked
            }
            if (currentItemIndex2 !== -1) {
                doneTaskList[currentItemIndex2].checked = !doneTaskList[currentItemIndex2].checked
            }
            console.log(toDoTaskList)
            console.log(doneTaskList)
            arrayFilters()
            doneTaskMaker ()
            taskMaker()
            storageRefresh()
        }

    // FILTER ARRAYS
    function arrayFilters () {
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
    ascSort = function (){
        toDoTaskList.sort((a,b)=> a.Date - b.Date)
        storageRefresh();
        taskMaker();
        console.log(toDoTaskList)
    }

    descSort = function () {
        toDoTaskList.sort((a,b)=> b.Date - a.Date)
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
    function doneTaskMaker () {
        let DoneTasks = document.querySelector('.done-tasks__container')
        DoneTasks.innerHTML = '';
        if (doneTaskList.length > 0) {
            doneTaskList.forEach(function (item) {
                DoneTasks.innerHTML += createTask(item);
            })
        }

    }

    //DELETEDTASK RENDER FUNC
    function deletedTaskMaker () {
        let deletedTasks = document.querySelector('.deleted__tasks__container')
        deletedTasks.innerHTML = '';
        if (deletedTaskList.length > 0) {
            deletedTaskList.forEach(function (item) {
                deletedTasks.innerHTML += createTask(item);
            })
        }

    }



    taskMaker()
    doneTaskMaker ()
    deletedTaskMaker()



    //NEW TASK CREATOR
        addTaskBtn.addEventListener('click', function () {
            toDoTaskList.push(new Task(taskTextValue.value, taskDateDeadline.value))
            storageRefresh();
            taskMaker();
            taskTextValue.value = '';
            taskDateDeadline.value = '';

        })

        // TASK REPLACER ON DELETE BLOCK
        deleter = function (id) {
            let deletedDate = Date.now()
            const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
            const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
            const deletedItemIndex = deletedTaskList.findIndex(item => item.id === id)
            if (currentItemIndex1 !== -1) {
                    toDoTaskList[currentItemIndex1].deletedDate = deletedDate;
                    deletedTaskList.push(toDoTaskList[currentItemIndex1]);
                    toDoTaskList.splice(currentItemIndex1, 1)
                }
            if (currentItemIndex2 !== -1) {
                    doneTaskList[currentItemIndex2].deletedDate = deletedDate;
                    deletedTaskList.push(doneTaskList[currentItemIndex2]);
                    doneTaskList.splice(currentItemIndex2, 1)
            }

            if (deletedItemIndex !== -1) {
                                let confirmation = confirm ('Are you right?')
                                if (confirmation) {
                                deletedTaskList = deletedTaskList.filter((item) => item.id !== id)
                        }
                    }

            deletedTaskList.sort((a,b)=> a.deletedDate - b.deletedDate)

            doneTaskMaker ()
            taskMaker()
            deletedTaskMaker()
            storageRefresh();
        }







        /* taskTextField.addEventListener('mouseover', function (){
             let overlayText = document.querySelector('.task-text-overlay')
             overlayText.style.display = 'block';
         })*/


        document.addEventListener('click', function (event) {
            event.target.focus()
        })


        let taskTextField = document.getElementsByClassName('.task-text')


        taskTextField.addEventListener('dblclick', function () {
            event.target.setAttribute('contenteditable', true)
        })



})




//ACCORDEON OPEN
function openBlock () {
    const block = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('deleted__accordeon')
}




//TASK REPLACER
/*function deleteTask () {
    const deleteButton = document.querySelector('.closed-button')
    deleteButton.parentElement.parentElement.remove()

}*/








