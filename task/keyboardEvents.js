document.addEventListener('DOMContentLoaded', function() {
    const task = document.querySelector('.task')
    task.addEventListener('click', function (event){
        event.target.focus()
    })

    const tasks = document.getElementsByClassName("task");

    console.log(tasks)
    let index = 0;

    tasks[index].focus();
    document.onkeydown = function (event) {
        event = event || window.event;
        switch (event.keyCode) {
            case 38:
                if (index > 0) {
                    tasks[--index].focus();
                }
                break;
            case 40:
                if (index < tasks.length) {
                    tasks[++index].focus();
                }
                break;
        }
    }

    /*const choosenTask = document.activeElement;
    choosenTask.addEventListener('keydown', function (event){
        if (event.keyCode === '69') {
            let taskTextField = choosenTask.querySelector('.task-text')
            taskTextField.setAttribute('contenteditable', true);
        }*/
})



