import { updateArticle, updateHeader } from "./main.js";
import Form from "./form.js";
import { header } from "./header.js";
import { main } from "./main.js";
import myLocal from "./myLocal.js";
import { createCustomElement } from "./create.js";
import {
  createAddProjectForm,
  createAddTaskForm,
  createSendToProjectDropDown,
} from "./component.js";
import {
  addTaskFormClickEvent,
  addToDropdownEvent,
  editTaskButtonEvent,
} from "./event.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "addTaskModal");
  const myForm = createAddTaskForm(modal);
  myForm.addEventListener("click", function (event) {
    addTaskFormClickEvent(event, modal);
  });
  modal.appendChild(myForm);

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

  myForm.addEventListener("click", function (event) {
    editTaskButtonEvent(event, modal);
  });
  modal.appendChild(myForm);

  //target if data exists, dropdown immediately show up
  if ("projectName" in data) {
    const target = Array.from(myForm.querySelectorAll(".form-row")).find(
      function (item) {
        return item.querySelector("#projectDropDown");
      }
    );
    myForm.insertBefore(createSendToProjectDropDown(), target.nextSibling);
  }

  return modal;
}

export { addTaskModal, addProjectModal, editTaskModal };
