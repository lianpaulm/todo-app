const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoInfo = document.querySelector('.todo-list-info')

form.addEventListener('submit', addTodo);

function addTodo(event) {
  event.preventDefault();
  
  const value = input.value;
  input.value = '';
  
  const item = document.createElement('li');
  item.classList.add('todo-item');
  
  // if value is not empty add list item
  if(value) {
    item.innerHTML = `<button class="check-item checkbox" aria-label="checkbox"></button>
    <p class="todo-text">${value}</p>
    <button class="remove-btn" aria-label="remove button"><img src="./images/icon-cross.svg" alt=""></button>`;
    todoList.append(item)
  };

  if (todoList.childElementCount > 0) {
    todoInfo.classList.add('display-todo-info');
  } 
  
  const checkItem = item.querySelector('.check-item');
  const todoText = item.querySelector('.todo-text');
  const removeItem = item.querySelector('.remove-btn');
  
  checkItem.addEventListener('click', () => {
    checkItem.classList.toggle('toggleCheck')
    todoText.classList.toggle('item-complete');
  })
  todoText.addEventListener('click', () => {
    checkItem.classList.toggle('toggleCheck');
    todoText.classList.toggle('item-complete');
  })
  removeItem.addEventListener('click', () => {
    removeItem.parentElement.remove();
    console.log(todoList.childElementCount);
    if (todoList.childElementCount === 0) {
      todoInfo.classList.remove('display-todo-info');
    }
  })
}
















// saving in local storage
// localStorage.setItem('names', JSON.stringify(['desirie','lian']))
// const loversNames = JSON.parse(localStorage.getItem('names'));
// console.log(loversNames);