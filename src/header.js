import { addTaskModal } from "./modal.js";
import {
  createNavLink,
  createButton,
  createAnchor,
  createCustomElement,
  createCard,
} from "./create.js";
import { updateArticle } from "./main.js";
import addIcon from "./add.png";

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

  navbarList.appendChild(
    createNavLink(
      "nav-item",
      createButton("add-task-button", "addTaskButton", "Add Task")
    )
  );
  navbarList.appendChild(
    createNavLink("nav-item", createAnchor("Your Todos", "/YourTodos"))
  );

  navbarList.appendChild(
    createNavLink(
      "nav-item",
      createButton("add-project-btn", "addProjectButton", "Your Project")
    )
  );

  const myImg = document.createElement("img");
  myImg.setAttribute("src", addIcon);
  myImg.setAttribute("class", "add-icon");
  const myListLink = navbarList.getElementsByClassName("nav-item");
  for (let item of myListLink) {
    item.addEventListener("mouseover", function () {
      if (item.firstChild.id === "addProjectButton") {
        item.appendChild(myImg);
      }
    });
  }
  navBar.appendChild(navbarList);
  headerContainer.appendChild(navBar);

  const modal = addTaskModal();
  headerContainer.appendChild(modal);
  navBar.addEventListener("click", function (event) {
    if (event.target.id === "addTaskButton") {
      modal.showModal();
    }

    if ((event.target.targetName = "a")) {
      event.preventDefault();
      window.history.pushState({}, "", event.target.href);
      updateArticle(window.location.pathname);
    }

    if ((event.target.id = "addProjectButton")) {
    }
  });

  body.appendChild(headerContainer);
}
