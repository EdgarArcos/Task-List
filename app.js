let inputs = document.querySelector("#input");
const listTasks = document.querySelector(".list-tasks ul")
const message = document.querySelector(".list-tasks")
let taskButton = document.querySelector("#taskButton")
let removeall = document.querySelector(".remove-all")
let tasks = [];
taskButton.addEventListener("click", addTasks)
listTasks.addEventListener("click", removeTask)
removeall.addEventListener("click", remove)
saveHtmlRefresh()

function addTasks(){
    clearHtml()
    let task = inputs.value;
    const messageError = document.querySelector(".messageError")
    if (task === "") {
        messageError.classList.add("error")
        setTimeout(() => {
            messageError.classList.remove("error")
        }, 2000);
        return;
    }
    taskObj ={
        task: task,
        id: Date.now() 
    }
    tasks= [...tasks, taskObj];
    createHTML();
    inputs.value=""
} 

function createHTML() {
    if (tasks.length > 0){
        tasks.forEach(task =>{
            let li =document.createElement("li")
            li.innerHTML = `<span task-id=${task.id}>${task.task} </span>`
            listTasks.appendChild(li);
            saveLocalStorage()
        })
    }
}

function saveLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function saveHtmlRefresh() {
    document.addEventListener("DOMContentLoaded" ,()=>{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        createHTML();
    });

}

function removeTask(e) {
    let deleteId = parseInt(e.target.getAttribute("task-id"))
    tasks = tasks.filter(task => task.id !== deleteId)
    clearHtml()
    createHTML();
} 

function clearHtml() {
    listTasks.innerHTML =""
}

function remove() {
    console.log("hola");
    tasks= [];
    createHTML()
}