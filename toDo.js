function addTask() {
    let text = document.createElement("p");
    text.innerText = document.getElementById("inputValue").value;
    document.getElementById("tasks").appendChild(text);
}