import Task from "./task.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  const form = document.createElement("form");
  const addButton = document.createElement("button");
  addButton.id = "formAddTask";
  addButton.innerText = "add Task";
  form.innerHTML = /* HTML */ `
    <div class="form-row">
      <label for="title">Title</label>
      <input type="text" id="title" />
    </div>
  `;

  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.length === 0) {
      localStorage.setItem(0, JSON.stringify([]));
    }
    const myStorage = JSON.parse(localStorage.getItem(0));
    let title = document.getElementById("title");
    const myTask = new Task(title.value);
    myStorage.push(myTask);
    localStorage.setItem(0, JSON.stringify(myStorage));
    console.log(myStorage);
    modal.close();
  });
  form.append(addButton);
  modal.appendChild(form);

  return modal;
}

export { addTaskModal };
