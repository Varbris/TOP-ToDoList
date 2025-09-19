import { addProjectModal, addTaskModal } from "./modal.js";
import {
  createNavLi,
  createButton,
  createAnchor,
  createCustomElement,
  createCard,
} from "./create.js";
import { updateArticle } from "./main.js";
import addIcon from "./add.png";
import myLocal from "./myLocal.js";
import { el } from "date-fns/locale";

export function header() {
  const body = document.getElementById("body");
  const headerContainer = document.createElement("header");
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");
  body.innerText = "";
  const navbarBrand = createCustomElement("div");
  navbarBrand.addChild(createAnchor("To Do List", "/"));
  navbarBrand.addAttribute("class", "brand-container");
  navBar.appendChild(navbarBrand.element);

  const navbarList = createNavbar();

  navBar.appendChild(navbarList);
  headerContainer.appendChild(navBar);
  const myTaskModal = addTaskModal();
  const myProjectModal = addProjectModal();
  navbarList.addEventListener("click", function (event) {
    if (event.target.id === "addTaskButton") {
      headerContainer.appendChild(myTaskModal);
      myTaskModal.showModal();
    }

    if (
      (event.target.targetName = "a" && event.target.pathname === "/YourTodos")
    ) {
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      updateArticle(window.location.pathname);
    }

    if (
      event.target.id === "addProjectButton" ||
      event.target.id === "addIcon"
    ) {
      headerContainer.appendChild(myProjectModal);
      myProjectModal.showModal();
    }

    if (
      (event.target.targetName = "a" && event.target.pathname === "/myProject")
    ) {
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      updateArticle(event.target.pathname);
    }
  });

  body.appendChild(headerContainer);
}

function createNavbar() {
  const navbarList = document.createElement("ul");
  navbarList.setAttribute("class", "navbar-nav");
  navbarList.appendChild(
    createNavLi(
      "nav-item",
      createButton("add-task-button", "addTaskButton", "Add Task")
    )
  );
  navbarList.appendChild(
    createNavLi("nav-item", createAnchor("Your Todos", "/YourTodos"))
  );

  const projectElement = [
    createAnchor("Your Project", "/myProject"),
    createButton("add-project-btn", "addProjectButton", ""),
  ];
  const myProjectLink = createCustomElement("li");
  myProjectLink.addAttribute("class", "nav-item");
  projectElement.forEach(function (element) {
    myProjectLink.addChild(element);
  });
  navbarList.appendChild(myProjectLink.element);

  const myImg = document.createElement("img");
  myImg.setAttribute("src", addIcon);
  myImg.setAttribute("class", "add-icon");
  myImg.setAttribute("id", "addIcon");

  const myListLink = navbarList.getElementsByClassName("nav-item");

  for (let item of myListLink) {
    item.addEventListener("mouseover", function (event) {
      if (event.target.id === "addProjectButton") {
        event.target.appendChild(myImg);
      }
    });
  }
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
    console.log(myProjectList.element);
    myProject.forEach((element) => {
      const li = createCustomElement("li");
      li.addAttribute("class", "project-item");
      const a = createAnchor(element, "/myProject/" + element);
      li.addChild(a);
      myProjectList.addChild(li.element);
    });
    myProjectContainer.addChild(myProjectList.element);
    projectList.addChild(myProjectList.element);
  }
  navbarList.appendChild(projectList.element);

  return navbarList;
}
