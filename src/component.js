//navbar component start///

import {
  createAnchor,
  createButton,
  createCustomElement,
  createNavLi,
} from "./create";
import addIcon from "./add.png";
import myLocal from "./myLocal.js";
import { updateArticle } from "./main.js";
import { perProjectClickEvent } from "./event.js";

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

    const myProjectContainer = createCustomElement("div");
    myProjectContainer.addAttribute("class", "my-project");
    const myProjectList = createCustomElement("ul");
    myProjectList.addAttribute("class", "project-list");
    myProjectList.element.innerText = "";

    const myProject = myLocal().getStorage("myProject");
    myProject.forEach((element) => {
      const li = createCustomElement("li");
      li.addAttribute("class", "project-item");
      const a = createAnchor(element.title, "/myProject/" + element.data);
      li.addChild(a);
      a.addEventListener("click", perProjectClickEvent);
      myProjectList.addChild(li.element);
    });
    myProjectContainer.addChild(myProjectList.element);
    projectList.addChild(myProjectContainer.element);
  }
  return projectList.element;
}
//navbar component end//

export {
  createNavbarBrand,
  createAddTaskButton,
  createYourTodos,
  createYourProject,
  yourProjectList,
};
