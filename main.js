let todos = [
  {
    task: "Make a list",
    done: false
  }
];

render();

function render() {
  const app = document.querySelector("#app");

  app.innerHTML = `
  <div class="card-body">
  <header class="form-group">
  <label>New Task</label>
  <input class="form-control w-100" placeholder="Enter a new task" />
  </header>
  <section>
  <ul class="list list-group mt-4"></ul>
  </section>
  <footer> </footer>
  </div>
  `;

  let list = document.querySelector(".list-group");
  list.append(...todos.map(createTask));

  let input = document.querySelector("input");
  input.addEventListener("keypress", handleInput);

  console.log(todos);
}

function handleInput(e) {
  if (e.keyCode === 13 && e.target.value) {
    console.log(e.target.value);
    todos.push({
      task: e.target.value,
      done: false
    });
    render();
  }
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
