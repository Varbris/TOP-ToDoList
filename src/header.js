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
  const navbarBrand = createCustomElement("div");
  navbarBrand.addChild(createAnchor("To Do List", "/"));
  navbarBrand.addAttribute("class", "brand-container");
  navBar.appendChild(navbarBrand.element);

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

  navbarList.appendChild(
    createNavLi(
      "nav-item",
      createButton("add-project-btn", "addProjectButton", "Your Project")
    )
  );

  if (myLocal().isExist("myProject")) {
    const myLocalData = myLocal().getStorage("myProject");
    const myProjectContainer = createCustomElement("div");
    myLocalData.forEach((element) => {
      const a = createAnchor(element, "/myProject/" + element);
      myProjectContainer.addChild(a);
    });
    myProjectContainer.addAttribute("class", "my-project");

    navbarList.appendChild(createNavLi("nav-item", myProjectContainer.element));
  }

  console.log(navbarList);

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
  navBar.appendChild(navbarList);
  headerContainer.appendChild(navBar);
  const myTaskModal = addTaskModal();
  const myProjectModal = addProjectModal();
  navbarList.addEventListener("click", function (event) {
    if (event.target.id === "addTaskButton") {
      headerContainer.appendChild(myTaskModal);
      myTaskModal.showModal();
    }

    if ((event.target.targetName = "a")) {
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
  });

  body.appendChild(headerContainer);
}
