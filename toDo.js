function addTask() {
    let text = document.createElement("div");
    text.className = "addTask";
    textValue = text.innerHTML = document.getElementById("inputValue").value;
    
    if (textValue == "") {
        alert("Add Task is mandatory !");
        return false;
    }
    document.getElementById("pendingTask").appendChild(text);

    let removeTask = document.createElement('input');
    removeTask.className = "removeButton";
    removeTask.setAttribute('type','button');
    removeTask.setAttribute("value","Remove");
    removeTask.setAttribute("id","removeButton");
    removeTask.addEventListener('click',function() {
        let warningText = "Are You Sure Delete This Task !";
        if (confirm(warningText) == true) {
          text.parentNode.removeChild(text);
        }
    }, false);
    text.appendChild(removeTask);
    document.getElementById("inputValue").value = "";

    let checkBox = document.createElement('input');
    checkBox.setAttribute("id","checkBox");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onchange","completedTask(checked,this)");
    editTask();
    text.appendChild(checkBox);
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
function editTask() {
    let edit = document.createElement("input");
    edit.setAttribute("type","button");
    edit.appendChild(parentElement);

}
