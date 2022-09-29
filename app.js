//selsectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event){
    // Prevent from submitting 
    event.preventDefault();

    if(todoInput.value != ""){
        // create todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Creating content of todo and append it to todoDiv
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // ADD TODO TO LOCOALSTORAGE
        saveLocoalTodos(todoInput.value);

        // Creating check and and append it to todoDiv
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
        completeButton.classList.add("complete-btn");   
        todoDiv.appendChild(completeButton);

        // Create trash button and append it to todoDiv
        const trash = document.createElement("button");
        trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trash.classList.add("trash-btn");   
        todoDiv.appendChild(trash);

        // Append todoDiv to todoList
        todoList.appendChild(todoDiv);

        // Clear to do input value 
        todoInput.value = "";
    }
}

function deleteCheck(e){
    const item = e.target;

    // Delete the todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // Animation 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        // Transitionend function will wait for the transition to end and after that this function will work
        todo.addEventListener("transitionend", function(){
            todo.remove(); 
        })
    }

    // Check Mark 
    if(item.classList[0] === 'complete-btn'){   
        const prnt = item.parentElement;
        prnt.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    console.log("Checking Todos ", todos);

    for(let i = 1; i < todos.length; i++){
        let todo = todos[i];
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                console.log("Checking " ,todo);
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
        }
    }
}  


function saveLocoalTodos(todo){
    // CHECK--have already things in it
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));  
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        // create todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Creating content of todo and append it to todoDiv
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Creating check and and append it to todoDiv
        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
        completeButton.classList.add("complete-btn");   
        todoDiv.appendChild(completeButton);

        // Create trash button and append it to todoDiv
        const trash = document.createElement("button");
        trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trash.classList.add("trash-btn");   
        todoDiv.appendChild(trash);

        // Append todoDiv to todoList
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem("todos", JSON.stringify(todos));
}