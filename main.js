let todos = [];

let filter = false;

let pendingTasks = 0;

render();

function render() {
  const app = document.querySelector("#app");

  pendingTasks = todos.reduce(
    (total, { done }) => (!done ? total + 1 : total),
    0
  );

  const doneTasks = todos.length - pendingTasks;

  app.innerHTML = `
  <div class="card-body">
  <header class="form-group">
  <label>New Task</label><button class="set-all btn btn-sm float-right">${
    pendingTasks === 0 ? "Restaure" : "Complete"
  } all </button>
  <input class="form-control w-100" placeholder="Enter a new task" />
  </header>
  <section>
  <ul class="list list-group mt-4"></ul>
  </section>
  <footer class="mt-4 justify-content-between align-items-center ${
    todos.length > 0 ? "d-flex" : "d-none"
  }">
  <small>${pendingTasks} pending task${pendingTasks === 1 ? "" : "s"}</small>
  <div class="filters">
   <button class="btn btn-sm"> All </button>
   <button class="btn btn-sm"> Pending </button>
   <button class="btn btn-sm"> Completed </button>
  </div>
  <button class="clear-all btn btn-sm">Clear complete </button>
  
  </footer>
  </div>
  `;

  let input = document.querySelector("input");
  input.addEventListener("keypress", handleInput);

  //Setting Filters
  setFilters(...app.querySelectorAll(".filters .btn"));

  //Filter List
  let todosFiltered = todos.filter(({ done }) => {
    switch (filter) {
      case "completed":
        return done;
      case "pending":
        return !done;
      default:
        return true;
    }
  });

  let list = document.querySelector(".list-group");
  list.append(...todosFiltered.map(createTask));

  //Complete All
  app.querySelector(".set-all").addEventListener("click", completeAll);

  //Clear all
  app.querySelector(".clear-all").addEventListener("click", clearAll);

  console.log(todos);
}

function handleInput(e) {
  if (e.keyCode === 13 && e.target.value) {
    todos.push({
      task: e.target.value,
      done: false
    });
    render();
  }
}

function setFilters(all, pending, completed) {
  all.addEventListener("click", () => {
    filter = false;
    render();
  });

  pending.addEventListener("click", () => {
    filter = "pending";
    render();
  });

  completed.addEventListener("click", () => {
    filter = "completed";
    render();
  });
}

function createTask(element, index) {
  const { task, done } = element;
  let item = document.createElement("li");
  item.classList.add("list-group-item");
  item.innerHTML = `
      <input type="checkbox" ${done ? "checked" : ""} />
      <label style="text-decoration: ${
        done ? "line-through" : "none"
      }"> ${task} </label>
      <button class="deleteButton btn-light float-right text-danger"> &times </button>
      `;

  //handle checkbox
  item.querySelector("input").addEventListener("click", e => {
    element.done = e.target.checked;
    render();
  });

  //delete task
  item.querySelector("button").addEventListener("click", e => {
    todos.splice(index, 1);
    render();
  });

  return item;
}

function completeAll() {
  todos.forEach(todo => {
    if (pendingTasks === 0) {
      todo.done = false;
    } else {
      todo.done = true;
    }
  });
  render();
}

function clearAll() {
  todos.forEach(todo => (todo.done = false));

  render();
}
