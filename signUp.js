function addUser() {
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userData = {name : userName,emailId : userEmail}
    let createUser = {
        method : "POST",
        headers  : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(userData)
    }
    fetch("http://localhost:8080/api/v1/user/add",createUser)
}