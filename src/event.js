import { updateArticle } from "./main.js";
import { createSendToProjectDropDown } from "./component.js";
import myLocal from "./myLocal.js";
import { header } from "./header.js";
import { main } from "./main.js";
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
    event.target.value === "YourTodos"
  ) {
    const toProject = document.getElementById("sendToProject");
    if (toProject !== null) {
      toProject.remove();
    }
  }
}

function addTaskFormClickEvent(event, modal) {
  addTaskButtonEvent(event, modal);
  taskFormcancelButtonEvent(event, modal);
}
function editTaskFormClickEvent(event, modal) {
  editProjectButtonEvent(event);
  taskFormcancelButtonEvent(event, modal);
}
function addTaskButtonEvent(event, modal) {
  event.preventDefault();
  if (event.target.id === "addTask") {
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
    title: name.value,
    data: name.value.replaceAll(" ", ""),
  };
  myStorage.push(myProject);
  myLocal().setStorage(storageName, myStorage);
  header();
  main();
  modal.close();
}

function editProjectButtonEvent(event) {
  if (event.target.id === "editTask") {
    event.preventDefault();
    const projectDropDown = document.getElementById("projectDropDown");
    const sendToProject = document.getElementById("sendToProject");
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("Due");
    const priority = document.getElementById("priorityDropDown");
    const id = document.getElementById("hiddenId");

    console.log(
      projectDropDown.value,
      sendToProject.value,
      title.value,
      description.value,
      date.value,
      priority.value,
      id.value
    );
  }
}

export {
  navbarClickEvent,
  perProjectClickEvent,
  addToDropdownEvent,
  addTaskFormClickEvent,
  addProjectSubmitEvent,
  editTaskFormClickEvent,
};
