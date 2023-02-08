function addTask() {
    let text = document.createElement("div");
    let removeTask = document.createElement('input');
    let checkBox = document.createElement('input');
    let editButton = document.createElement("input");
    let taskValue = document.createElement("input");
    text.className = "addTask";
    checkText = taskValue.value = document.getElementById("inputValue").value;
    taskValue.className = "taskvalueAlign";
    taskValue.disabled = true;
    text.appendChild(taskValue);
    
    if (checkText == "") {
        alert("Add Task is mandatory !");
        return false;
    }
    document.getElementById("pendingTask").appendChild(text);

    removeTask.className = "removeButton";
    removeTask.setAttribute('type','button');
    removeTask.setAttribute("value","Remove");
    removeTask.setAttribute("id","removeButton");
    removeTask.setAttribute("onclick","deleteAlertBox(this)");
    text.appendChild(removeTask);

    checkBox.setAttribute("id","checkBox");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onchange","completedTask(checked,this)");
    text.appendChild(checkBox);

    editButton.setAttribute("type","button");
    editButton.setAttribute("value","Edit");
    editButton.className = "editButtonAlign";
    editButton.addEventListener("click",function() {
        removeTask.previousSibling.disabled = false;
    }, false);
    editButton.addEventListener("dblclick",function() {
        removeTask.previousSibling.disabled = true;
    },);
    text.appendChild(editButton);
    apiHit();
    document.getElementById("inputValue").value = "";
}
function completedTask(isChecked,element) {
    if (isChecked) {
        let subDiv = document.createElement("div");
        document.getElementById("completedTag").style.display = "block";
        subDiv.className = "completedDiv";
        subDiv = element.parentElement;
        document.getElementById("specifyTask").appendChild(subDiv);
    } else {
        count = document.getElementById("pendingTask").childElementCount-1;
        if (count == 0) {
            document.getElementById("completedTag").style.display = "none";
        }
        document.getElementById("pendingTask").appendChild(element.parentElement);
    }
}
function deleteAlertBox(element) { 
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
        element.parentElement.remove();
    } );
    cancelButton.innerText = "Cancel";
    cancelButton.className = "cancelButtonAlign";
    cancelButton.addEventListener("click",function() {
        alertDiv.remove();
    })
    alertDiv.appendChild(cancelButton);
    alertDiv.appendChild(okButton);
    document.body.appendChild(alertDiv);
}
function apiHit() {
    let addTasks = document.getElementById("inputValue").value;
    let addTaskDatabase = { taskName : addTasks};
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
}