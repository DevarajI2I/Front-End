function addTask() {
    let text = document.createElement("div");
    text.className = "addTask";
    textValue = text.innerHTML = document.getElementById("inputValue").value;
    if (textValue == "") {
        alert("Add Task is mandatory !");
        return false;
    }
    document.getElementById("tasks").appendChild(text);

    let removeTask = document.createElement('input');
    removeTask.className = "removeButton";
    removeTask.setAttribute('type','button');
    removeTask.setAttribute("value","Remove");
    removeTask.setAttribute("id","removeButton");
    removeTask.addEventListener('click',function() {
          text.parentNode.removeChild(text);
    }, false);
    text.appendChild(removeTask);
    document.getElementById("inputValue").value = "";

    let checkBox = document.createElement('input');
    checkBox.setAttribute("id","checkBox");
    checkBox.type = "checkbox";
    checkBox.setAttribute("onchange","completedTask(checked,this)");
    text.appendChild(checkBox);

}
function completedTask(isChecked,element) {
    if (isChecked) {
        element.parentElement.style.backgroundColor = "lightgray";
    } else {
        element.parentElement.style.backgroundColor = "#6dd9bb";
    }
}
