window.addEventListener("load", function() {
    getTaskValue();
    assignCompletedTask();
});
function addTask(element) {
    let text = document.createElement("div");
    let removeTask = document.createElement('input');
    let checkBox = document.createElement('input');
    let editButton = document.createElement("input");
    let taskValue = document.createElement("input");
    text.className = "addTask";
    
    taskValue.className = "taskvalueAlign";
    taskValue.disabled = true;
    taskValue.value = element.taskName;
    text.appendChild(taskValue);
    document.getElementById("pendingTask").appendChild(text);

    let elements = element;
    removeTask.className = "removeButton";
    removeTask.setAttribute('type','button');
    removeTask.setAttribute("value","Remove");
    removeTask.setAttribute("id","removeButton");
    removeTask.addEventListener("click",function() {
        deleteAlertBox(removeTask,elements);
    });
    text.appendChild(removeTask);

    checkBox.setAttribute("id","checkBox");
    checkBox.type = "checkbox";
    checkBox.addEventListener("click",function() {
        completedTask(checkBox,element);
    });
    text.appendChild(checkBox);

    editButton.setAttribute("type","button");
    editButton.setAttribute("value","Edit");
    editButton.className = "editButtonAlign";
    editButton.addEventListener("click",function() {
        removeTask.previousSibling.disabled = false;
    }, false);
    editButton.addEventListener("dblclick",function() {
        removeTask.previousSibling.disabled = true;
        let editedText = removeTask.previousSibling.value;
        element.taskName = editedText;
        updateValueDatabase(element);
    },);
    text.setAttribute("id","getInputValues");
    text.appendChild(editButton);
    document.getElementById("inputValue").value = "";
}
function completedTask(checked,element) {
    if (checked) {
        element.completedStatus = true;
        updateValueDatabase(element);
        assignCompletedTask(checked,element);
    }
}
function deleteAlertBox(removeValue,element) {
    let alertDiv = document.createElement("div");
    let message = document.createElement("p");
    let okButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    message.className = "alertMessage";
    alertDiv.className = "alertDivAlign";
    message.innerHTML = "Are You Sure Delete This Task!";
    alertDiv.appendChild(message);
    okButton.innerText = "ok";
    okButton.className = "okButtonAlign";
    okButton.addEventListener("click",function() {
        alertDiv.remove();
        deleteValueDatabase(element);
        removeValue.parentElement.remove();
    } );
    cancelButton.innerText = "Cancel";
    cancelButton.className = "cancelButtonAlign";
    cancelButton.addEventListener("click",function() {
        alertDiv.remove();
    } );
    alertDiv.appendChild(cancelButton);
    alertDiv.appendChild(okButton);
    document.body.appendChild(alertDiv);
}
function apiHit() {
    let addTasks = document.getElementById("inputValue").value;
    let addTaskDatabase = {taskName : addTasks};
    if (addTasks == "") {
        alert("Add Task Mandatory!");
        return false;
    }
    fetch ('http://localhost:8080/api/v1/todo/addTask', {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(addTaskDatabase)
    } )
    .then((response) => response.json())
    .then((addTaskDatabase) => { console.log('Succes',addTaskDatabase); })
    .catch((error) => { console.log('Error',error); });
    getTaskValue();
}
function getTaskValue() {
    let searchDiv = document.createElement("div");
    searchDiv.className = "inputSearchText";
    
    //document.getElementById("demo").innerText = "demo";
    console.log(searchDiv);
    //searchTask = document.getElementById("whiteRectangle");
    //searchTask.appendChild(searchDiv);

    let getValues = {
        method : "GET",
    }
    fetch("http://localhost:8080/api/v1/todo/getTask",getValues)
    .then((response) => response.json())
    .then((task) => { for (let values of task)
     { addTask(values)} 
    })
    .then((getValues) => { ("success",getValues); })
    .catch((error) => { ("Error",error); });
}
function deleteValueDatabase(removeValue) {
    let deleteDatabase = {
        method : "DELETE",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(removeValue)
    }
    fetch("http://localhost:8080/api/v1/todo/deleteTask",deleteDatabase);
}
function updateValueDatabase(updateValue) {
    console.log(updateValue);
    let updateDatabase = {
        method : "PUT",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(updateValue)
    }
    fetch("http://localhost:8080/api/v1/todo/editTask",updateDatabase);
}
function assignCompletedTask(checked,element) {
    let subDiv = document.createElement("div");
    let hideTask = document.getElementById("completedTag");
    let count = 0;
    subDiv.setAttribute("id","subDiv");
    let demo = {
        method : "GET",
    }
    fetch("http://localhost:8080/api/v1/todo/getTask",demo)
    .then((response) => response.json())
    .then((demos) => { for (let demoss of demos) {
        if (demoss.completedStatus == true) { 
            count ++;
            hideTask.style.display = "block";
            hideTask.innerText = "Completed Task : " + count;
            let parentValue = document.getElementById("getInputValues");
            subDiv.appendChild(parentValue);
            document.getElementById("specifyTask").appendChild(subDiv);
        }
    }
    })
        hideTask.addEventListener("click",function() {
            if (subDiv.style.display == "none") {   
                subDiv.style.display = "block";
                } else  {  
                    subDiv.style.display = "none";
                }
            })
    if(checked) {
        element.completedStatus = false;
        updateValueDatabase(element);
    }
}
function searchTask() {
    alert("hai");
}