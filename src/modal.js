import { updateArticle, updateHeader } from "./main.js";
import Form from "./form.js";
import { header } from "./header.js";
import myLocal from "./myLocal.js";
import { createCustomElement } from "./create.js";

function addTaskModal() {
  const modal = document.createElement("dialog");

  const testForm = new Form();
  const myForm = testForm.myForm;
  testForm.addInputField("text", "title");
  testForm.addInputField("text", "description");
  testForm.addInputField("date", "Due");
  const projectOption = [
    testForm.addDropdownOption("YourTodos", "Your ToDos"),
    testForm.addDropdownOption("YourProject", "Your Project"),
  ];
  testForm.addDropDown("Add To: ", projectOption, "projectDropDown");

  const priorityOption = [
    testForm.addDropdownOption("Priority1", "Priority 1"),
    testForm.addDropdownOption("Priority2", "Priority 2"),
    testForm.addDropdownOption("Priority3", "Priority 3"),
    testForm.addDropdownOption("Priority4", "Priority 4"),
  ];
  testForm.addDropDown("Priority: ", priorityOption, "priorityDropDown");

  testForm.addButton("add-task", "addTask", "Add");
  testForm.addButton("cancel-button", "cancelButton", "Cancel");
  modal.appendChild(myForm);

  var dropDownClickNumber = 0;
  myForm.addEventListener("click", function (event) {
    if (
      event.target.id === "projectDropDown" &&
      event.target.value === "YourProject" &&
      dropDownClickNumber < 1
    ) {
      const selectProject = createCustomElement("select");
      selectProject.addAttribute("id", "sendToProject");
      const myProjectData = myLocal().getStorage("myProject");
      const option = createCustomElement("option");
      if (myProjectData == null) {
        option.addInner("You dont have a project");
        selectProject.addChild(option.element);
        selectProject.element.disabled = true;
      } else {
        myProjectData.forEach((element) => {
          option.addInner("");
          option.addAttribute("value", element);
          option.addInner(element);
          selectProject.addChild(option.element);
        });
      }

      testForm.insertInputAfter(event.target, selectProject.element);
      dropDownClickNumber = 1;
    } else if (
      event.target.id === "projectDropDown" &&
      event.target.value === "YourTodos"
    ) {
      const toProject = document.getElementById("sendToProject");
      dropDownClickNumber = 0;
      if (toProject !== null) {
        toProject.remove();
      }
    }
  });

  myForm.addEventListener("click", function (event) {
    if (event.target.id === "addTask") {
      event.preventDefault();
      const addToProject = document.getElementById("projectDropDown");
      let title = document.getElementById("title");
      let description = document.getElementById("description");
      let date = document.getElementById("Due");
      const priority = document.getElementById("priorityDropDown");
      myLocal().createStorage(addToProject.value);
      const myStorage = myLocal().getStorage(addToProject.value);

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
        priority: priority.value,
      };
      myStorage.push(myTask);
      myLocal().setStorage(addToProject.value, myStorage);
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

function addProjectModal() {
  const myModal = document.createElement("dialog");
  const myForm = new Form();
  const getForm = myForm.myForm;
  myForm.addInputField("text", "name");
  myForm.addButton("form-add-project", "formAddProject", "Add Project");
  getForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const storageName = "myProject";
    const name = document.getElementById("name");
    myLocal().createStorage(storageName);
    const myStorage = myLocal().getStorage(storageName);
    myStorage.push(name.value);
    myLocal().setStorage(storageName, myStorage);
    header();
    myModal.close();
  });
  myModal.appendChild(getForm);
  return myModal;
}

export { addTaskModal, addProjectModal };
