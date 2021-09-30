const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

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
    <button class="remove-btn">
      <img src="./images/icon-cross.svg" alt="">
    </button>`;
    todoList.append(item)
  };

  // adding check button
  const checkItem = item.querySelector('.check-item');
  const todoText = item.querySelector('.todo-text');

  checkItem.addEventListener('click', () => {
    checkItem.classList.toggle('toggleCheck')
    todoText.classList.toggle('item-complete');
  })
  todoText.addEventListener('click', () => {
    checkItem.classList.toggle('toggleCheck');
    todoText.classList.toggle('item-complete');
  })

  // adding remove button
  const removeItem = item.querySelector('.remove-btn');
  removeItem.addEventListener('click', () => {
    removeItem.parentElement.remove();
  })
}



// saving in local storage
// localStorage.setItem('names', JSON.stringify(['desirie','lian']))
// const loversNames = JSON.parse(localStorage.getItem('names'));
// console.log(loversNames);