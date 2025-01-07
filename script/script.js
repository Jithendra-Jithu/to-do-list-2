/**
 * @fileoverview This file contains the code for the To-Do List app.
 * @author  Mahmoud Khaleel
 * @version 1.0
 * @since   2023-04-26
 */


const inputBox =document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add a task to the list
function addTask(){
    if(inputBox.value === ""){
        alert("Please Enter a Task");
    }
    else{
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerText = "\u00D7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();

}

// check if the user press the enter key or remove the task
listContainer.addEventListener("click", function(event){
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData();
    }
    else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData();
    }
}, false);

// save the data to the local storage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// show the data from the local storage
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();