function addTask() {
    let text = document.createElement("div");
    text.className = "addTask";
    let taskValue = document.createElement("input");
    checkText = taskValue.value = document.getElementById("inputValue").value;
    taskValue.className = "taskvalueAlign";
    taskValue.disabled = true;
    text.appendChild(taskValue);
    
    if (checkText == "") {
        alert("Add Task is mandatory !");
        return false;
    }
    document.getElementById("pendingTask").appendChild(text);

    let removeTask = document.createElement('input');
    removeTask.className = "removeButton";
    removeTask.setAttribute('type','button');
    removeTask.setAttribute("value","Remove");
    removeTask.setAttribute("id","removeButton");
    // removeTask.addEventListener('click',function() {
    //     let warningText = "Are You Sure Delete This Task !";
    //     let alertDiv = document.createElement("div");
    //     alertDiv.className = "alertDivAlign";
    //     text.parentNode(alertDiv);
        //document.body.appendChild(alertDiv);
        // if (confirm(warningText) == true) {
        //   text.parentNode.removeChild(text);
        // }
    // }, false);
    removeTask.setAttribute("onclick","deleteAlertBox(this)");
    text.appendChild(removeTask);
    document.getElementById("inputValue").value = "";

    let checkBox = document.createElement('input');
    checkBox.setAttribute("id","checkBox");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onchange","completedTask(checked,this)");
    text.appendChild(checkBox);

    let editButton = document.createElement("input");
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
    message.className = "alertMessage";
    alertDiv.className = "alertDivAlign";
    message.innerHTML = "Are You Sure Delete This Task!";
    alertDiv.appendChild(message);
    //warningText.appendChild(alertDiv);
    document.body.appendChild(alertDiv);
}
