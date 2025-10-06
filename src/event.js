import { updateArticle } from "./main.js";
import { createSendToProjectDropDown } from "./component.js";
import myLocal from "./myLocal.js";
import { header } from "./header.js";
import { main } from "./main.js";
import { editTaskModal } from "./modal.js";
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
function editTaskFormClickEvent(event, modal, data) {
  editTaskButtonEvent(event, data);
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

function editTaskButtonEvent(event, data) {
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
    if (sendToProject !== null) {
      myLocal().createStorage(sendToProject.value);
      let myProject;
      console.log(sendToProject.value, previousData.projectName);
      if (sendToProject.value === previousData.projectName) {
        myProject = myLocal().getStorage(sendToProject.value);
      } else {
        myProject = myLocal().getStorage(previousData.projectName);
      }

      updatedData.projectName = sendToProject.value;
      myProject = myProject.map((element) => {
        if (element.id === parseInt(id.value)) {
          element = updatedData;
          return element;
        } else {
          return element;
        }
      });
      myLocal().setStorage(sendToProject.value, myProject);
    } else {
      // myLocal().createStorage(projectDropDown.value);
      // const myStorage = myLocal().getStorage(projectDropDown.value);
      // myStorage.forEach((element, index) => {
      //   if (element.id === parseInt(id.value)) {
      //     element = updatedData;
      //     return element;
      //   } else {
      //     return element;
      //   }
      // });
      // myStorage.push(updatedData);
      // myLocal().setStorage(addToProject.value, myStorage);
    }

    updateArticle(window.location.pathname);
  }
}

function toDoControlButtonEvent(event, data, currentPath, container) {
  toDoDeleteButtonEvent(event, data, currentPath);
  toDoEditButtonEvent(event, data, container);
}

function toDoDeleteButtonEvent(event, data, currentPath) {
  if (event.target.id === "DeleteTodosBtn") {
    currentPath = currentPath.replaceAll(" ", "");
    const getData = myLocal().getStorage(currentPath);
    getData.forEach(function (element, index) {
      if (element.id === data.id) {
        getData.splice(index, 1);
        myLocal().setStorage(currentPath, getData);
        updateArticle(currentPath);
      }
    });
  }
}

function toDoEditButtonEvent(event, data, container) {
  if (event.target.id === "EditTodosBtn") {
    const modal = editTaskModal(data);
    container.appendChild(modal);
    modal.showModal();
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
};
