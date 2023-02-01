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
    removeTask.addEventListener('click',function(e) {
          text.parentNode.removeChild(text);
    }, false);
    text.appendChild(removeTask);
}
// var i;
//     for (i = 0; i < text.length; i++) {
//     let span = document.createElement("span");
//     let remove = document.createTextNode("\u00D7");
//     span.appendChild(remove);
//     }