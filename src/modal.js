import { updateArticle, updateHeader } from "./main.js";
import Form from "./form.js";
import { header } from "./header.js";
import { main } from "./main.js";
import myLocal from "./myLocal.js";
import { createCustomElement } from "./create.js";
import { createAddTaskForm } from "./component.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "addTaskModal");
  modal.appendChild(createAddTaskForm(modal));
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
    const myProject = {
      title: name.value,
      data: name.value.replaceAll(" ", ""),
    };
    myStorage.push(myProject);
    myLocal().setStorage(storageName, myStorage);
    header();
    main();
    myModal.close();
  });
  myModal.appendChild(getForm);
  return myModal;
}

function editTaskModal(data) {
  const modal = document.createElement("dialog");
  const testForm = new Form();
  const myForm = testForm.myForm;
  console.log(typeof data.date);
  testForm.addInputField("text", "title", data.title);
  testForm.addInputField("text", "description", data.description);
  testForm.addInputField("date", "Due", data.date);
  const projectOption = [
    testForm.addDropdownOption("YourTodos", "Your ToDos", data.safeTo),
    testForm.addDropdownOption("YourProject", "Your Project", data.safeTo),
  ];
  testForm.addDropDown("Add To: ", projectOption, "projectDropDown");

  const priorityOption = [
    testForm.addDropdownOption("Priority1", "Priority 1", data.priority),
    testForm.addDropdownOption("Priority2", "Priority 2", data.priority),
    testForm.addDropdownOption("Priority3", "Priority 3", data.priority),
    testForm.addDropdownOption("Priority4", "Priority 4", data.priority),
  ];
  testForm.addDropDown("Priority: ", priorityOption, "priorityDropDown");

  testForm.addButton("add-task", "addTask", "Add");
  testForm.addButton("cancel-button", "cancelButton", "Cancel");
  modal.appendChild(myForm);

  var dropDownClickNumber = 0;
  const selectProject = createCustomElement("select");
  const option = createCustomElement("option");
  selectProject.addAttribute("id", "sendToProject");
  const myProjectData = myLocal().getStorage("myProject");

  if ("projectName" in data) {
    myProjectData.forEach((element) => {
      option.addAttribute("value", element.data);
      option.addInner(element.title);
      selectProject.addChild(option.element);
    });
  }
  myForm.addEventListener("click", function (event) {
    if (
      event.target.id === "projectDropDown" &&
      event.target.value === "YourProject" &&
      dropDownClickNumber < 1
    ) {
      if (myProjectData == null) {
        option.addInner("You dont have a project");
        selectProject.addChild(option.element);
        selectProject.element.disabled = true;
      } else {
        myProjectData.forEach((element) => {
          option.addAttribute("value", element.data);
          option.addInner(element.title);
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

export { addTaskModal, addProjectModal, editTaskModal };
