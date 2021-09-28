const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

form.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();

  const value = input.value;
  const item = document.createElement('li');
  item.classList.add('todo-item');
  if(value) {
    item.innerHTML = `<div class="checkbox" aria-label="checkbox"></div>
    <p class="todo-text">${value}</p>
    <button class="remove-btn">
      <img src="./images/icon-cross.svg" alt="">
    </button>`;

    todoList.append(item)
  };

  input.value = ''
}

