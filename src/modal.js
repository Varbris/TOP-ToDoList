import { updateArticle } from "./main.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  const form = document.createElement("form");
  const addButton = document.createElement("button");
  const article = document.getElementById("article");
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
      localStorage.setItem("myTask", JSON.stringify([]));
    }
    const myStorage = JSON.parse(localStorage.getItem("myTask"));
    let title = document.getElementById("title");
    const myTask = {
      title: title.value,
    };
    myStorage.push(myTask);
    localStorage.setItem("myTask", JSON.stringify(myStorage));
    let test = document.getElementById("article");
    updateArticle();
    modal.close();
  });
  form.append(addButton);
  modal.appendChild(form);

  return modal;
}

export { addTaskModal };
