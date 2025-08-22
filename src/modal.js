import { updateArticle } from "./main.js";
import Form from "./form.js";

function addTaskModal() {
  const modal = document.createElement("dialog");

  const testForm = new Form();
  const myForm = testForm.myForm;
  testForm.addInputField("text", "title");
  testForm.addInputField("text", "description");
  testForm.addInputField("date", "Due");
  const option = [
    testForm.addDropdownOption("YourTodos", "Your ToDos"),
    testForm.addDropdownOption("YourProject", "Your Project"),
  ];
  testForm.addDropDown("Add To: ", option, "projectDropDown");

  testForm.addButton("add-task", "addTask", "Add");
  testForm.addButton("cancel-button", "cancelButton", "Cancel");
  modal.appendChild(testForm.myForm);

  myForm.addEventListener("click", function (event) {
    if (event.target.id === "addTask") {
      event.preventDefault();
      const addToProject = document.getElementById("projectDropDown");
      console.log(
        "is project exist: ",
        localStorage.hasOwnProperty(addToProject.value),
        addToProject.value
      );
      if (
        localStorage.length === 0 ||
        !localStorage.hasOwnProperty(addToProject.value)
      ) {
        localStorage.setItem(addToProject.value, JSON.stringify([]));
      }
      const myStorage = JSON.parse(localStorage.getItem(addToProject.value));

      let title = document.getElementById("title");
      let description = document.getElementById("description");
      let date = document.getElementById("Due");
      if (date.value === null || date.value === "") {
        date = "No Date";
      } else {
        date = date.value.split("-").map(function (item) {
          return parseInt(item);
        });
      }
      const myTask = {
        title: title.value,
        description: description.value,
        date: date,
      };
      myStorage.push(myTask);
      localStorage.setItem(addToProject.value, JSON.stringify(myStorage));
      let test = document.getElementById("article");
      updateArticle(window.location.pathname);
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
