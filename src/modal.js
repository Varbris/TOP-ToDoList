import { updateArticle, updateHeader } from "./main.js";
import Form from "./form.js";
import { header } from "./header.js";
import { main } from "./main.js";
import myLocal from "./myLocal.js";
import { createButton, createCustomElement } from "./create.js";
import {
  createAddProjectForm,
  createAddTaskForm,
  createDeleteProjectModal,
  createSendToProjectDropDown,
} from "./component.js";
import {
  addTaskFormClickEvent,
  deleteProjectDialogWarning,
  editTaskFormClickEvent,
} from "./event.js";

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
    editTaskFormClickEvent(event, modal, data);
  });
  modal.appendChild(myForm);

  return modal;
}

function deleteProjectModal(id) {
  const modal = document.createElement("dialog");
  const p = document.createElement("P");
  const p2 = document.createElement("P");
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "warning-control");
  let button = [
    createButton("confirm-button", "confirmButton", "Confirm"),
    createButton("cancel-button", "cancelButton", "Cancel"),
  ];
  p.innerText = "Are you sure want to delete your project ?";
  p2.innerText = "Warning! Your whole project gonna be erased!";
  modal.appendChild(p);
  modal.appendChild(p2);
  button.forEach((element) => {
    if (element.id === "confirmButton") {
      element.setAttribute("data-id", id);
    }
    element.addEventListener("click", function (event) {
      deleteProjectDialogWarning(event, modal);
    });
    buttonContainer.appendChild(element);
  });
  modal.appendChild(buttonContainer);
  return modal;
}

export { addTaskModal, addProjectModal, editTaskModal, deleteProjectModal };
