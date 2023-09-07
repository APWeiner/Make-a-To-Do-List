const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

function handleKeyUp(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function addTask(){
    if(inputBox.value === ''){
        alert("You must write what you need to do");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = 'x';
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}
function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showList();
