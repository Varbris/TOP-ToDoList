import { createAnchor, createCustomElement } from "./create.js";
import { navbarClickEvent } from "./event.js";

import {
  createAddTaskButton,
  createNavbarBrand,
  createYourProject,
  createYourTodos,
  yourProjectList,
} from "./component.js";
import { addProjectModal, addTaskModal } from "./modal.js";

export function header() {
  const body = document.getElementById("body");
  const headerContainer = document.createElement("header");
  headerContainer.setAttribute("id", "header");
  body.innerText = "";

  const navBar = createNavbar();

  headerContainer.appendChild(navBar);

  body.appendChild(headerContainer);
}

function createNavbar() {
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");
  navBar.appendChild(createNavbarBrand());
  const navbarList = document.createElement("ul");
  navbarList.setAttribute("class", "navbar-nav");
  navbarList.appendChild(createAddTaskButton());
  navbarList.appendChild(createYourTodos());
  navbarList.appendChild(createYourProject());
  navbarList.appendChild(yourProjectList());
  const myTaskModal = addTaskModal();
  const myProjectModal = addProjectModal();
  navbarList.addEventListener("click", function (event) {
    if (event.target.id === "addTaskButton") {
      navbarClickEvent(event, myTaskModal);
    } else if (
      event.target.id === "addProjectButton" ||
      event.target.id === "addIcon"
    ) {
      navbarClickEvent(event, myProjectModal);
    } else {
      navbarClickEvent(event);
    }
  });
  navBar.appendChild(navbarList);
  return navBar;
}
