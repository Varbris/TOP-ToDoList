import { updateArticle } from "./main.js";
import { createSendToProjectDropDown } from "./component.js";
import myLocal from "./myLocal.js";
import { header } from "./header.js";
import { main } from "./main.js";
import { deleteProjectModal, editTaskModal } from "./modal.js";
import { deleteData, editSendToEqual } from "./model.js";
function navbarClickEvent(event, modal) {
  const headerContainer = document.getElementById("header");

  if (event.target.id === "addTaskButton") {
    event.preventDefault();
    event.target.href = "/";
    window.history.pushState({}, "", event.target.href);
    headerContainer.appendChild(modal);
    modal.showModal();
  }

  if (
    (event.target.targetName = "a" && event.target.pathname === "/YourTodos")
  ) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    updateArticle(window.location.pathname);
  }

  if (event.target.id === "addProjectButton" || event.target.id === "addIcon") {
    headerContainer.appendChild(modal);
    modal.showModal();
  }

  if (
    (event.target.targetName = "a" && event.target.pathname === "/myProject")
  ) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    updateArticle(event.target.pathname);
  }
}

function perProjectClickEvent(event) {
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  updateArticle(window.location.pathname);
}

//form event
function addToDropdownEvent(event, testForm) {
  if (
    event.target.id === "projectDropDown" &&
    event.target.value === "YourProject"
  ) {
    const selectProject = createSendToProjectDropDown();

    testForm.insertInputAfter(event.target, selectProject);
  } else if (
    event.target.id === "projectDropDown" &&
    event.target.value === "YourTodos" &&
    event.target.parentNode.querySelector("#sendToProject") !== null
  ) {
    event.target.parentNode.querySelector("#sendToProject").remove();
  }
}

function addTaskFormClickEvent(event, modal) {
  addTaskButtonEvent(event, modal);
  taskFormcancelButtonEvent(event, modal);
}
function editTaskFormClickEvent(event, modal, data) {
  editTaskButtonEvent(event, data, modal);
  taskFormcancelButtonEvent(event, modal);
}
function addTaskButtonEvent(event, modal) {
  if (event.target.id === "addTask") {
    event.preventDefault();
    const addToProject = document.getElementById("projectDropDown");
    const sendToProject = document.getElementById("sendToProject");
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("Due");
    const priority = document.getElementById("priorityDropDown");

    if (date.value === null || date.value === "") {
      date = "No Date";
    } else {
      date = date.value.split("-").map(function (item) {
        return parseInt(item);
      });
    }
    const myTask = {
      id: Math.floor(Math.random() * 1000),
      title: title.value,
      description: description.value,
      date: date,
      safeTo: addToProject.value,
      priority: priority.value,
    };

    if (sendToProject !== null) {
      myLocal().createStorage(sendToProject.value);
      const myProject = myLocal().getStorage(sendToProject.value);
      myTask.projectName = sendToProject.value;
      myProject.push(myTask);
      myLocal().setStorage(sendToProject.value, myProject);
    } else {
      myLocal().createStorage(addToProject.value);
      const myStorage = myLocal().getStorage(addToProject.value);
      myStorage.push(myTask);
      myLocal().setStorage(addToProject.value, myStorage);
    }

    updateArticle(window.location.pathname);
    modal.close();
    modal.remove();
  }
}
function taskFormcancelButtonEvent(event, modal) {
  if (event.target.id === "cancelButton") {
    event.preventDefault();
    modal.close();
  }
}
function addProjectSubmitEvent(event, modal) {
  event.preventDefault();
  const storageName = "myProject";
  const name = document.getElementById("name");
  myLocal().createStorage(storageName);
  const myStorage = myLocal().getStorage(storageName);
  const myProject = {
    id: Math.floor(Math.random() * 1000),
    title: name.value,
    data: name.value.replaceAll(" ", ""),
  };
  myStorage.push(myProject);
  myLocal().setStorage(storageName, myStorage);
  header();
  main();
  modal.close();
}

function editTaskButtonEvent(event, data, modal) {
  if (event.target.id === "editTask") {
    event.preventDefault();
    const previousData = data;
    const projectDropDown = document.getElementById("projectDropDown");
    const sendToProject = document.getElementById("sendToProject");
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("Due");
    const priority = document.getElementById("priorityDropDown");
    const id = document.getElementById("hiddenId");

    const updatedData = {
      id: parseInt(id.value),
      title: title.value,
      description: description.value,
      date:
        date.value === null || date.value === ""
          ? "No Date"
          : date.value.split("-").map(function (item) {
              return parseInt(item);
            }),
      safeTo: projectDropDown.value,
      priority: priority.value,
    };
    //edit if the project on the same path,
    //if user edit on todos, it will edit the same way as if user edit on certain project.
    //still can't figure out what the best algorithm to use, but this works.
    if (previousData.safeTo === updatedData.safeTo && sendToProject === null) {
      editSendToEqual(projectDropDown.value, updatedData, id.value);
    } else if (
      sendToProject !== null &&
      sendToProject.value === previousData.projectName
    ) {
      updatedData.projectName = sendToProject.value;
      editSendToEqual(sendToProject.value, updatedData, id.value);
    } else if (
      previousData.safeTo === projectDropDown.value &&
      previousData.projectName !== sendToProject.value &&
      sendToProject !== null
    ) {
      const myProject = myLocal().getStorage(sendToProject.value);
      updatedData.projectName = sendToProject.value;
      deleteData(previousData, previousData.projectName);
      myProject.push(updatedData);
      myLocal().setStorage(sendToProject.value, myProject);
    }

    //if the user edit add to project drop down. it can send from todos to certain project or back and forth
    //still can't figure out what the best algorithm to use on this too.
    if (previousData.safeTo !== updatedData.safeTo) {
      const saveTarget =
        sendToProject === null ? projectDropDown.value : sendToProject.value;
      const deleteTarget =
        sendToProject === null ? previousData.projectName : previousData.safeTo;
      const myProject = myLocal().getStorage(saveTarget);
      deleteData(previousData, deleteTarget);
      updatedData.projectName = saveTarget;
      myProject.push(updatedData);
      myLocal().setStorage(saveTarget, myProject);
    }

    //algorithm for change project directory, back and forth
    //still, my perfectionist is shit. :(.

    updateArticle(window.location.pathname);
    modal.close();
    modal.remove();
  }
}

function toDoControlButtonEvent(event, data, currentPath, container) {
  toDoDeleteButtonEvent(event, data, currentPath);
  toDoEditButtonEvent(event, data, container);
}

function toDoDeleteButtonEvent(event, data, currentPath) {
  if (event.target.id === "DeleteTodosBtn") {
    deleteData(data, currentPath);
  }
}

function toDoEditButtonEvent(event, data, container) {
  if (event.target.id === "EditTodosBtn") {
    const modal = editTaskModal(data);
    container.appendChild(modal);
    modal.showModal();
  }
}

function deleteProjectButtonEvent(event) {
  if (
    event.target.id === "deleteProjectBtn" ||
    event.target.id === "deleteIcon"
  ) {
    const myModal = deleteProjectModal(event.target.dataset.id);
    const container = document.getElementById("myProject");
    container.appendChild(myModal);
    myModal.showModal();
  }
}

function deleteProjectDialogWarning(event, modal) {
  if (event.target.id === "confirmButton") {
    console.log(event.target.dataset.id);
    let myProject = myLocal().getStorage("myProject");
    let projectName;

    myProject.forEach((item, index) => {
      if (item.id === parseInt(event.target.dataset.id)) {
        projectName = item.data;
        myProject.splice(index, 1);
      }
    });
    myLocal().removeStorage(projectName);
    myLocal().setStorage("myProject", myProject);
    updateArticle(window.location.pathname);
    header();
    main();
    modal.close();
    modal.remove();
  }
}
export {
  navbarClickEvent,
  perProjectClickEvent,
  addToDropdownEvent,
  addTaskFormClickEvent,
  addProjectSubmitEvent,
  editTaskFormClickEvent,
  toDoControlButtonEvent,
  deleteProjectButtonEvent,
  deleteProjectDialogWarning,
};
