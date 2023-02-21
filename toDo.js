window.addEventListener("load", function() {
    welcomePage();
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
    return text;
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
function apiHit(userObject) {
    let addTasks = document.getElementById("inputValue").value;
    let addTaskDatabase = {taskName : addTasks,userId : userObject.id};
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
}
function getTaskValue(userObject) {
    alert("get");
    let getUserValues = userObject.id;
    fetch("http://localhost:8080/api/v1/todo/getTask?d="+getUserValues)
    .then((response) => response.json())
    .then((task) => { for (let values of task)
    { addTask(values) } 
})
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
    let assignedTask = {
        method : "GET",
    }
    fetch("http://localhost:8080/api/v1/todo/getTask",assignedTask)
    .then((response) => response.json())
    .then((completedTasks) => { for (let finished of completedTasks) {
        if (finished.completedStatus == true) { 
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
    let rectangle = document.getElementById("whiteRectangle");
    let leftRectangle = document.getElementById("leftRectangle");
    let searchInput = document.createElement("input");
    searchInput.setAttribute("id","searchTask");
    rectangle.addEventListener("click",function() {
        searchInput.className = "inputSearchText";
        searchInput.placeholder = "Search";
        searchInput.style.display = "block";
        document.body.appendChild(searchInput);

        searchInput.addEventListener("keydown",function(event) {
            if (event.key == "Enter") {
                let searchDiv = document.createElement("div");
                searchDiv.className = "searchDiv";
                document.body.appendChild(searchDiv);
                let getSearchValues  = document.getElementById("searchTask").value;
                let searchLink = "http://localhost:8080/api/v1/todo/searchTask?taskName=" + getSearchValues;
                let searchValue = fetch(searchLink);
                searchValue.then(response => {
                    response.json().then(result => { for (let results of result) {
                       let list = addTask(results); 
                       searchDiv.appendChild(list);
                    }});
                })
            }
        })
    })
    leftRectangle.addEventListener("click",function() {
        searchInput.style.display = "none";
    })
}
function login() {
    let login = document.createElement("div");
    let loginDiv = document.createElement("div");
    let loginText = document.createElement("div");
    let loginForm = document.createElement("form");
    let loginName = document.createElement("input");
    let loginEmail = document.createElement("input");
    let signUp = document.createElement("button");
    let nameTag = document.createElement("span");
    let emailTag = document.createElement("span");

    loginDiv.className = "loginDiv";
    login.className = "login";
    loginText.className = "loginText";
    loginName.className = "loginName";
    loginEmail.className = "loginEmail";
    signUp.className = "signUp";
    nameTag.className = "nameTag";
    emailTag.className = "emailTag";
    loginEmail.placeholder = "Email - Id";
    loginName.placeholder = "Name";
    loginText.innerText = "Log - In";
    nameTag.innerText = "Name  : ";
    emailTag.innerText = "Email -Id  :"
    signUp.innerHTML = "Sign up";

    login.setAttribute("id","masterLogin")
    login.setAttribute("id","loginMain");
    loginName.setAttribute("id","userName");
    loginEmail.setAttribute("id","userEmail");

    loginDiv.appendChild(loginText);
    loginDiv.appendChild(loginForm);
    loginForm.appendChild(nameTag);
    loginForm.appendChild(emailTag);
    loginForm.appendChild(loginName);
    loginForm.appendChild(loginEmail);
    loginForm.appendChild(signUp);
    login.appendChild(loginDiv);
    document.body.appendChild(login);
    signUp.addEventListener("click",function() {
        userData();
        login.remove();
    })
}
function userData() {
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userList = {emailId : userEmail,name : userName};
    let userDatas = {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(userList)
    }
    fetch("http://localhost:8080/api/v1/user/add",userDatas);
    apiHit();
}
function todoPage(data) {
    let topRectangle = document.createElement("div");
    let symbolsOutlined = document.createElement("div");
    let materialSymbols = document.createElement("span");
    let toDoAlign = document.createElement("div");
    let todo = document.createElement("span");
    let leftRectangle = document.createElement("div");
    let searchHide = document.createElement("div");
    let searchHideInside = document.createElement("div");
    let boxWidth = document.createElement("input");
    let submitButton = document.createElement("button");
    let taskBackground = document.createElement("div");
    let pendingTaskHeight = document.createElement("div");
    let pendingTask = document.createElement("div");
    let specifyTask = document.createElement("div");
    let completedTag = document.createElement("span");
    let whiteRectangle = document.createElement("div");
    let search = document.createElement("span");
    let searchIcon = document.createElement("span");
    
    materialSymbols.className = "material-symbols-outlined";
    symbolsOutlined.className = "symbols-outlined";
    toDoAlign.className = "toDoAlign";
    todo.className = "toDo";
    leftRectangle.className = "leftRectangle";
    boxWidth.className = "boxWidth";
    topRectangle.className = "topRectangle";
    submitButton.className = "submitButton";
    submitButton.addEventListener("click",function() {
        apiHit(data);
    })
    taskBackground.className = "taskBackground";
    whiteRectangle.className = "whiteRectangle";
    search.className = "search";
    searchIcon.className = "material-symbols-outlined search-icon-color";

    materialSymbols.innerText = "apps";
    todo.innerText = "To Do";
    submitButton.innerText = "Add";
    searchIcon.innerText = "search";

    boxWidth.placeholder = "  Add Task";

    searchHide.setAttribute("id","searchHide");
    boxWidth.setAttribute("id","inputValue");
    taskBackground.setAttribute("id","tasks");
    pendingTaskHeight.setAttribute("id","pendingTaskHeight");
    pendingTask.setAttribute("id","pendingTask");
    specifyTask.setAttribute("id","specifyTask");
    completedTag.setAttribute("id","completedTag");
    whiteRectangle.setAttribute("id","whiteRectangle");

    
    specifyTask.appendChild(completedTag);
    taskBackground.appendChild(specifyTask);
    pendingTaskHeight.appendChild(pendingTask);
    taskBackground.appendChild(pendingTaskHeight);
    searchHide.appendChild(taskBackground);
    searchHideInside.appendChild(submitButton);
    searchHideInside.appendChild(boxWidth);
    searchHide.appendChild(searchHideInside);
    topRectangle.appendChild(searchHide);
    topRectangle.appendChild(leftRectangle);
    toDoAlign.appendChild(todo);
    symbolsOutlined.appendChild(toDoAlign);
    symbolsOutlined.appendChild(materialSymbols);
    topRectangle.appendChild(symbolsOutlined);
    search.appendChild(searchIcon);
    whiteRectangle.appendChild(search);
    topRectangle.appendChild(whiteRectangle);
    document.body.appendChild(topRectangle);
    searchTask();
    getTaskValue();
}
function welcomePage() {
    let welcomeDiv = document.createElement("div");
    let sinIn = document.createElement("span");
    let email = document.createElement("span");
    let emailInput = document.createElement("input");
    let buttons = document.createElement("button");
    let buttonOk = document.createElement("button");

    emailInput.setAttribute("id","emailInput");
    sinIn.className = "sinIn";
    sinIn.innerText = "Sign -In";
    email.innerText = " Email - Id :";
    email.className = "email";
    emailInput.placeholder = "Enter Your Email Id";
    buttons.innerText = "Sig - Up";
    buttons.className = "sigUp";
    buttonOk.innerText = "ok";
    buttonOk.className = "buttonOk";
    buttonOk.addEventListener("click",function() {
        let emailValue =  document.getElementById("emailInput").value;
        welcomeDiv.remove();
        signUpChecking(emailValue);
    })
    welcomeDiv.appendChild(buttonOk);
    welcomeDiv.appendChild(buttons);
    email.appendChild(emailInput);
    welcomeDiv.appendChild(email);
    welcomeDiv.appendChild(sinIn);
    welcomeDiv.className = "welcomeDiv";
    buttons.addEventListener("click",function() {
        login();
        welcomeDiv.remove();
    })
    document.body.appendChild(welcomeDiv);
}
function signUpChecking(emailId) {
    fetch("http://localhost:8080/api/v1/user/get?emailId="+emailId)
    .then((response) => response.json())
    .then((data) => todoPage(data))   
}
