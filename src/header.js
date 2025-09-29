import { createAnchor, createCustomElement } from "./create.js";
import { navbarClickEvent } from "./event.js";

import {
  createAddTaskButton,
  createNavbarBrand,
  createYourProject,
  createYourTodos,
  yourProjectList,
} from "./component.js";

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
  navbarList.addEventListener("click", navbarClickEvent);
  navBar.appendChild(navbarList);
  return navBar;
}
