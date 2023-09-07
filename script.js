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
        li.setAttribute("draggable", "true")

        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

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

var draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.setData("text/plain", event.target.textContent);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (draggedItem !== event.target) {
    // Swap the positions of the dragged item and the drop target
    var temp = event.target.innerHTML;
    var tempClass = event.target.classList.contains("checked");

    event.target.innerHTML = draggedItem.innerHTML;
    event.target.classList.toggle("checked", draggedItem.classList.contains("checked"));

    draggedItem.innerHTML = temp;
    draggedItem.classList.toggle("checked", tempClass);
    saveData()
  }
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}
function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
    var liElements = listContainer.querySelectorAll("li")
    liElements.forEach(function(li) {
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);
    });
}
showList();
