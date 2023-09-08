const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

// press enter to add task
function handleKeyUp(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

//Add Task function
function addTask(){
    if(inputBox.value === ''){
        alert("You must write what you need to do");
    }
    else{
        //add the task-text
        let li = document.createElement("li");
        let task = document.createElement("span");
        task.classList.add("task-text")
        task.innerHTML = inputBox.value;
        li.appendChild(task);

        //make the task draggable
        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

        //add the edit button
        listContainer.appendChild(li);
        let edit = document.createElement("button");
        edit.innerHTML = 'edit';
        li.appendChild(edit);

        //add the remove button
        let span = document.createElement("span");
        span.classList.add('remove');
        span.innerHTML = 'x';
        li.appendChild(span);
    }
    //empties add task input field and saves the tasks to localstorage
    inputBox.value = "";
    saveData();
}

//function for pressing the save button on task text change
function saveTask(target){
    const li = target.parentNode
    const input = li.firstElementChild;

    const task = document.createElement('span');
    task.classList.add('task-text');
    task.innerHTML = input.value;

    li.insertBefore(task,  input);
    li.removeChild(input);

    target.innerHTML = "edit";
    saveData();
}


//function for changing task values
listContainer.addEventListener("click", function(e){
    //check off a task
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    //removes the task
    else if(e.target.classList.contains("remove")){
        e.target.parentElement.remove();
        saveData();
    }
    //edits the task text
    else if(e.target.textContent === "edit"){
        const li = e.target.parentNode;
        const span = li.firstElementChild;
        //creates an input field with the task text inside
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        //Can press enter to save a task change
        input.addEventListener('keydown', function(event){
            if (event.key === "Enter") {
                event.preventDefault();
                saveTask(e.target);
            }
        })
        //replaces the task text with the input field
        li.insertBefore(input, span);
        li.removeChild(span);
        //focuses the cursor to the input field
        input.focus();
        //changes edit button to save button
        e.target.innerHTML = "save";
    }
    else if(e.target.textContent === "save"){
        saveTask(e.target);
    }
}, false);

var draggedItem = null;

function dragStart(event) {
  draggedItem = event.target.closest("li");
  event.dataTransfer.setData("text/plain", event.target.textContent);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const li = event.target.closest("li");
  if (draggedItem !== event.target) {
    // Swap the positions of the dragged item and the drop target
    var temp = li.innerHTML;
    var tempClass = li.classList.contains("checked");

    li.innerHTML = draggedItem.innerHTML;
    li.classList.toggle("checked", draggedItem.classList.contains("checked"));

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
