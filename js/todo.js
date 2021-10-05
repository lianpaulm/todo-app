const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoInfo = document.querySelector('.todo-list-info');
const itemsLeft = document.querySelector('.items-left');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearBtn = document.querySelector('.clear-completed');
const todoEmpty = document.querySelector('.todo-empty');
const todoEmptyText = document.querySelector('.empty-text');


// item count
let count = 0;

// add event listener
document.addEventListener('DOMContentLoaded', saveTodos);
form.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteCheck);
clearBtn.addEventListener('click', clearCompleted)


function addTodo(e) {
  e.preventDefault();

  const value = input.value;
  const item = document.createElement('li');
  item.classList.add('todo-item');

  // if value is not empty add list item
  if (value) {
    item.innerHTML = `<button class="check-item checkbox" aria-label="checkbox"></button>
    <p class="todo-text">${value}</p>
    <button class="remove-btn" aria-label="remove button"></button>`;
    todoList.append(item);

    // add to the items left
    count++
    updateItemsCount(count)
  }

  // add todo to local storage
  saveLocalTodos(input.value)

  // display todo info if the todo list have an item
  if (todoList.childElementCount > 0) {
    todoInfo.classList.add('display-todo-info');
  }

  // clear todo input value
  input.value = '';
}

function deleteCheck(e) {
  const item = e.target;

  // check item completed
  if(item.classList[0] === 'check-item' || item.classList[0] === 'todo-text') {
    const todoItem = item.parentElement;
    todoItem.classList.toggle('completed')

    // update items left
    if(todoItem.classList.contains('completed')) {
      count--
    } else {
      count++
    }
    updateItemsCount(count);
  }

  // delete item
  if(item.classList[0] === 'remove-btn') {
    const todoItem = item.parentElement;
    todoItem.remove();

    // also remove in local storage
    removeLocalTodos(todoItem);

    // delete todo info if the todo list have nothing item on it
    if (todoList.childElementCount === 0) {
      todoInfo.classList.remove('display-todo-info');
    }

    //update items left
    if (!todoItem.classList.contains('completed')) {
      count--;
      updateItemsCount(count);
    }
  }
}

// filter buttons event listener
filterBtns.forEach((btn) => {
  btn.addEventListener('click', filterTodo);
});
// filtering todo list items
function filterTodo(e) {
  const todos = [...todoList.children];
  const completedList = [];
  const activeList = [];

  todos.forEach(todo => {
    const filterCategory = e.currentTarget.dataset.id; 

    switch (filterCategory) {
      case 'all':
        todo.style.display = 'flex';
        todoEmpty.classList.remove('show-todo-empty');
        break;

        case 'active':
          if(!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
            activeList.push(todo)
          } else {
            todo.style.display = 'none';
          }
          
          todoEmpty.classList.remove('show-todo-empty');
          if (activeList.length === 0) {
            todoEmpty.classList.add('show-todo-empty');
            todoEmptyText.textContent = `no active task`;
          }
        break;

      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex'
          completedList.push(todo);
        }else {
          todo.style.display = 'none';
        }

        todoEmpty.classList.remove('show-todo-empty');
        if (completedList.length === 0) {
          todoEmpty.classList.add('show-todo-empty');
          todoEmptyText.textContent = `no completed task`
        }
      }
    })

  // adding active status on buttons
  filterBtns.forEach((btn) => {
    btn.classList.remove('active-status');
  });
  e.currentTarget.classList.add('active-status');
}

// clear completed items function
function clearCompleted() {
  const todos = [...todoList.children];
  todos.forEach(todo => {
    if(todo.classList.contains('completed')) {
      todo.remove()
      
      removeLocalTodos(todo);
    }
  })
  if (todoList.childElementCount === 0) {
    todoInfo.classList.remove('display-todo-info');
  }
}

// items left function
function updateItemsCount(number) {
  itemsLeft.textContent = `${number} items left`;
}


// saving in local storage
function saveLocalTodos(todo){
  let todos;
  // check if already have thing in the local storage
  if(localStorage.getItem('todos') === null) {
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// save todo items in local storage
function saveTodos(){
  let todos;
  // check if already have thing in the local storage
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const value = input.value;
    const item = document.createElement('li');
    item.classList.add('todo-item');

    // if value is not empty add list item
    if (todo) {
      item.innerHTML = `<button class="check-item checkbox" aria-label="checkbox"></button>
    <p class="todo-text">${todo}</p>
    <button class="remove-btn" aria-label="remove button"></button>`;
      todoList.append(item);

      // add to the items left
      count++;
      updateItemsCount(count);
    }

    // display todo info if the todo list have an item
    if (todoList.childElementCount > 0) {
      todoInfo.classList.add('display-todo-info');
    }
  })
}

// remove todo items in local storage
function removeLocalTodos(todo){
  let todos;
  // check if already have thing in the local storage
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoText = todo.children[1].innerText; 
  const todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}
