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
import { addTaskFormClickEvent, editTaskFormClickEvent } from "./event.js";

function addTaskModal() {
  const modal = document.createElement("dialog");
  modal.setAttribute("id", "addTaskModal");
  const myForm = createAddTaskForm();
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
  const myForm = createAddTaskForm(data);

  myForm.addEventListener("click", function (event) {
    editTaskFormClickEvent(event, modal);
  });
  modal.appendChild(myForm);

  return modal;
}

export { addTaskModal, addProjectModal, editTaskModal };
