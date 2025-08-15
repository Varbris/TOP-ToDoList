import { updateArticle } from "./main.js";
import Form from "./form.js";

function addTaskModal() {
  const modal = document.createElement("dialog");

  const testForm = new Form();
  const myForm = testForm.myForm;
  testForm.addInputField("text", "title");
  testForm.addButton("add-task", "addTask", "Add");
  testForm.addButton("cancel-button", "cancelButton", "Cancel");
  modal.appendChild(testForm.myForm);

  myForm.addEventListener("click", function (event) {
    if (event.target.id === "addTask") {
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
    }

    if (event.target.id === "cancelButton") {
      event.preventDefault();
      modal.close();
    }
  });

  return modal;
}

export { addTaskModal };
