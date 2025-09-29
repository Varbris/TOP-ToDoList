import {
  createNavLi,
  createButton,
  createAnchor,
  createCustomElement,
  createCard,
} from "./create.js";
import { navbarClickEvent } from "./event.js";
import { updateArticle } from "./main.js";
import addIcon from "./add.png";
import myLocal from "./myLocal.js";
import { el } from "date-fns/locale";

export function header() {
  const body = document.getElementById("body");
  const headerContainer = document.createElement("header");
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

//navbar component

function createNavbarBrand() {
  const navbarBrand = createCustomElement("div");
  navbarBrand.addChild(createAnchor("To Do List", "/"));
  navbarBrand.addAttribute("class", "brand-container");
  return navbarBrand.element;
}

function createAddTaskButton() {
  return createNavLi(
    "nav-item",
    createButton("add-task-button", "addTaskButton", "Add Task")
  );
}

function createYourTodos() {
  return createNavLi("nav-item", createAnchor("Your Todos", "/YourTodos"));
}

function createYourProject() {
  const projectElement = [
    createAnchor("Your Project", "/myProject"),
    createButton("add-project-btn", "addProjectButton", ""),
  ];
  const myImg = document.createElement("img");
  myImg.setAttribute("src", addIcon);
  myImg.setAttribute("class", "add-icon-hidden");
  myImg.setAttribute("id", "addIcon");

  const myProjectLink = createCustomElement("li");
  myProjectLink.addAttribute("class", "nav-item");
  projectElement.forEach(function (element) {
    if (element.id === "addProjectButton") {
      element.appendChild(myImg);
      myProjectLink.addChild(element);
    } else {
      myProjectLink.addChild(element);
    }
  });

  return myProjectLink.element;
}

function yourProjectList() {
  const projectList = createCustomElement("li");
  projectList.addAttribute("class", "nav-item");
  if (myLocal().isExist("myProject")) {
    projectList.addInner("");
    const myProject = myLocal().getStorage("myProject");
    const myProjectContainer = createCustomElement("div");
    myProjectContainer.addAttribute("class", "my-project");
    const myProjectList = createCustomElement("ul");
    myProjectList.addAttribute("class", "project-list");
    myProjectList.element.innerText = "";

    myProject.forEach((element) => {
      const li = createCustomElement("li");
      li.addAttribute("class", "project-item");
      const a = createAnchor(element.title, "/myProject/" + element.data);
      li.addChild(a);
      a.addEventListener("click", function (event) {
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        updateArticle(window.location.pathname);
      });
      myProjectList.addChild(li.element);
    });
    myProjectContainer.addChild(myProjectList.element);
    projectList.addChild(myProjectList.element);
  }
  return projectList.element;
}
