const  lightTheme = document.querySelector('#lightmode')
const topInput = document.querySelector(".headinput")
const darkTheme = document.querySelector('.modedark')
const body = document.body
const inputTextArea = document.querySelector('.input-area')
const inputElement = document.querySelector('.inputelement')
const todoListContainer = document.querySelector('.todolistcontainer')
const todoListRadio= document.querySelector('.checkinginp')
const section = document.querySelector('section')
const topTextArea = document.querySelector('.input-wrapper')

let todoListItems = JSON.parse(localStorage.getItem('todoListItems')) || [];
let todoListHTML = '';
inputElement.addEventListener('keydown', (e)=>{
 if (e.key =="Enter" ){
    e.preventDefault()
    const newTodo = inputElement.value.trim()
    if(newTodo !== ""){
        todoListItems.unshift(newTodo)
        inputElement.value=""
        updateTodoList();
        saveTodoList();
     }
    }
})

function updateTodoList() {
    todoListHTML = ""; 
    for (let i = 0; i < todoListItems.length; i++) {
        let mainTodo = todoListItems[i];
        todoListHTML += `
            <div class="context" style="display:flex; justify-content: space-between;">
                <div class="inputwrapper">
                    <input type="radio" class="radiosection" maxlength="30" onclick="markCompleted(this)">
                    <span class="todos">${mainTodo}<img src="./images/icon-check.svg" class="checkicon"></span>
                </div>
                <div class="delete-wrapper">
                    <button onclick="deleteTodoItem(${i})" class="deletbtnn"><img src="./images/icon-cross.svg" class"checkicon"></button>
                </div>
            </div><hr>
        `;
    }
    todoListContainer.innerHTML = todoListHTML;
}

function markCompleted(radio) {
    const todoItem = radio.nextElementSibling; // Assuming this correctly selects the todo item element
    const checkIcon = todoItem.querySelector('.checkicon');

    if (radio.checked) {
        todoItem.classList.add('completed');
        checkIcon.style.display = "inline";
    } else {
        todoItem.classList.remove('completed');
        checkIcon.style.display = "none";
    }

    saveTodoList(); // Save the updated todo list state
}

// Event listener for the check icon (outside of any function)
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('checkicon')) {
        const radio = e.target.closest('.context').querySelector('.radiosection');
        radio.checked = false;

        const todoItem = e.target.closest('.context').querySelector('.todos');
        const checkIcon = e.target;

        todoItem.classList.remove('completed');
        checkIcon.style.display = 'none';

        saveTodoList(); // Save the updated todo list state
    }
});

// Function to delete a todo item
function deleteTodoItem(index) {
    todoListItems.splice(index, 1);
    updateTodoList();
    saveTodoList();
}

function saveTodoList() {
    localStorage.setItem('todoListItems', JSON.stringify(todoListItems));
}



lightTheme.addEventListener('click', () => {
    topInput.style.backgroundColor="hsl(235, 24%, 19%)"
    topTextArea.style.backgroundColor="hsl(235, 24%, 19%)"
    inputElement.style.backgroundColor="hsl(235, 24%, 19%)"
    darkTheme.style.display = "flex";
    lightTheme.style.display = "none";
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    body.style.backgroundImage = 'url(./images/bg-desktop-dark.jpg)';
    body.style.color = "white";
    section.style.backgroundColor = " hsl(235, 24%, 19%)";
    const todosElements = document.querySelectorAll('.todos');
    todosElements.forEach(todo => {
        todo.style.color = " hsl(236, 9%, 61%)";
    });
    document.querySelectorAll('.radiosection').forEach(radioinput =>{
       if (radioinput.checked){
        radioinput.style.backgroundColor = "linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
       }else{
        radioinput.style.backgroundColor = "hsl(235, 24%, 19%)";
       }
    })
    

});



darkTheme.addEventListener('click', () => {
    const todosElements = document.querySelectorAll('.todos');
    todosElements.forEach(todo => {
        todo.style.color = "black";
    });
    topInput.style.backgroundColor="white"
    lightTheme.style.display = "block";
    darkTheme.style.display = "none";
    body.style.backgroundColor = "white";
    body.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
    body.style.color = "hsl(236, 9%, 61%)";
    section.style.backgroundColor = "white"; 
    topTextArea.style.backgroundColor="white"
    inputElement.style.backgroundColor="white"
    document.querySelectorAll('.radiosection').forEach(radioinput =>{
        if (radioinput.checked){
         radioinput.style.backgroundColor = "linear-gradient(to bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
        }else{
         radioinput.style.backgroundColor = "white";
        }
     })
    
});
