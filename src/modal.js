import { updateArticle, updateHeader } from "./main.js";
import Form from "./form.js";
import { header } from "./header.js";
import { main } from "./main.js";
import myLocal from "./myLocal.js";
import { createCustomElement } from "./create.js";
import { createAddProjectForm, createAddTaskForm } from "./component.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "addTaskModal");
  modal.appendChild(createAddTaskForm(modal));
  return modal;
}

function addProjectModal() {
  const myModal = document.createElement("dialog");
  const myForm = createAddProjectForm(myModal);
  myModal.appendChild(myForm);
  return myModal;
}

function editTaskModal(data) {
  const modal = document.createElement("dialog");
  const myForm = createAddTaskForm(modal, data);
  modal.appendChild(myForm);

  const selectProject = createCustomElement("select");
  const option = createCustomElement("option");
  selectProject.addAttribute("id", "sendToProject");
  const myProjectData = myLocal().getStorage("myProject");

  if ("projectName" in data) {
    myProjectData.forEach((element) => {
      option.addAttribute("value", element.data);
      option.addInner(element.title);
      selectProject.addChild(option.element);
      console.log(selectProject.element);
    });

    const target = Array.from(myForm.querySelectorAll(".form-row")).find(
      function (item) {
        return item.querySelector("#projectDropDown");
      }
    );

    myForm.insertBefore(selectProject.element, target.nextSibling);
  }

  return modal;
}

export { addTaskModal, addProjectModal, editTaskModal };
