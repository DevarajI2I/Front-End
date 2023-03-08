window.addEventListener("load",function() {
    date();
})

let task = document.getElementById("inputValue");
task.addEventListener("keydown",function(event) {
    if(event.key == "Enter") {
        addTask();
    }
})

let mainCompletedDiv = document.getElementById("mainCompletedDiv");
mainCompletedDiv.addEventListener("click",function() {
    completedTaskShow();
})
mainCompletedDiv.addEventListener("dblclick",function() {
    hideCompletedTask();
})
let userIcons = document.getElementById("userIcon");
userIcons.addEventListener("click",function() {
    userIcon();
})
function date() {
    let date = new Date().toLocaleDateString('en-us', { weekday : "long",  month : "long", day : "numeric" });
    document.getElementById("date").innerHTML = date;
    getTaskValue();
}
function addTask() {
    let taskValue = document.getElementById("inputValue").value;
    let userValue = localStorage.getItem("userObject");
    let userData = JSON.parse(userValue);
    console.log(userData)
    if (taskValue == "") {
        alert("Add task is mandatory !");
        return false;
    }
    
    let value = { taskName : taskValue,userId : userData}
    let addTask = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(value)
    }
    fetch("http://localhost:8080/api/v1/todo/addTask",addTask)
    .then((response) => response.json())
    .then((value) => { console.log('Succes',value); })
    .catch((error) => { console.log('Error',error); });
    document.getElementById("inputValue").value = "";
}
function getTaskValue() {
    let userData = localStorage.getItem("userObject");
    let userId = JSON.parse(userData);
    let getValues = userId.id;
    fetch("http://localhost:8080/api/v1/todo/getByUser?userId="+getValues)
    .then((response) => response.json())
    .then((taskDatas) => { 
        { createDiv(taskDatas) }
    } )
}
function createDiv(inputText) { 
    let taskDiv = document.getElementById("pendingTask");
    let createDiv = document.getElementById("createDiv");
    let appendNewDiv = document.getElementById("appendNewDiv");
    let count = 0;
    for (let task of inputText) {
        let createInputDiv = createDiv.cloneNode(true);
        createInputDiv.childNodes[3].childNodes[1].value = task.taskName;
        createInputDiv.childNodes[3].childNodes[1].disabled = true;
        taskDiv.appendChild(createInputDiv);
        let inputCircle = createInputDiv.childNodes[1].childNodes[1];
        let deleteIcon = createInputDiv.childNodes[3].childNodes[3].childNodes[1];
        deleteIcon.innerText = "close";
        let editIcon = createInputDiv.childNodes[3].childNodes[5].childNodes[1];
        editIcon.innerText = "edit";
        editIcon.addEventListener("click",function() {
            if (createInputDiv.childNodes[3].childNodes[1].disabled == false) {
                let editTask = createInputDiv.childNodes[3].childNodes[1].value;
                task.taskName = editTask;
                updateTaskValue(task);
                createInputDiv.childNodes[3].childNodes[1].disabled = true;
                editIcon.innerText = "edit";
            } else {
                createInputDiv.childNodes[3].childNodes[1].disabled = false;
                editIcon.innerText = "save_as";
            }
        })
        
        deleteIcon.addEventListener("click",function() {
            createInputDiv.remove();
            deleteTask(task);
        })
        inputCircle.addEventListener("click",function() {
            if (task.completedStatus == "false") {
                task.completedStatus = "true";
                updateTaskValue(task);
            } else {
                task.completedStatus = "false";
                updateTaskValue(task);
            }
        })
        
        if (task.completedStatus == true) {
            let checkedCircle = createInputDiv.childNodes[1].childNodes[1];
            mainCompletedDiv.style.display = "block";
            checkedCircle.innerText = "check_circle";
            appendNewDiv.appendChild(createInputDiv);
            count++;
        }
    }
    document.getElementById("countValue").innerText = count;
}
function completedTaskShow() {
     let appendNewDiv = document.getElementById("appendNewDiv");
     let arrowIcon = document.getElementById("downArrow");
     arrowIcon.innerText = "expand_more";
     appendNewDiv.style.display = "block";
     let countTask =  document.getElementById("inputValue");
     let counted = countTask.length;
     console.log(counted)
}
function hideCompletedTask() {
    let appendNewDivs = document.getElementById("appendNewDiv");
    let leftArrow = document.getElementById("downArrow");
    leftArrow.innerText = "chevron_right";
    appendNewDivs.style.display = "none";
}
function updateTaskValue(inputText) {
    let updateTask = {
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(inputText)
    }
    fetch("http://localhost:8080/api/v1/todo/editTask",updateTask);
}
function getUser() {
    let getByEmail = document.getElementById("emailId").value;
    fetch("http://localhost:8080/api/v1/user/get?emailId="+getByEmail)
    .then((response) => response.json())
    .then((user) => setUser(user));
}
function setUser(user) {
    localStorage.setItem("userObject",JSON.stringify(user));
}
function deleteTask(deleteValue) {
     let deleteTask =  {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(deleteValue)
     }
     fetch("http://localhost:8080/api/v1/todo/deleteTask",deleteTask)
}
function userIcon() {
    localStorage.removeItem("userObject");
}