import { addTaskModal } from "./modal.js";

export function header() {
  const body = document.getElementById("body");
  const headerContainer = document.createElement("header");
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");

  navBar.innerHTML = /* HTML */ `
    <div class="brand-container">
      <a href="" class="navbar-brand">
        <h1>To Do List</h1>
      </a>
    </div>
  `;
  const navbarList = document.createElement("ul");
  navbarList.appendChild(
    createNavLink(
      "nav-item",
      createButton("add-task-button", "addTaskButton", "Add Task")
    )
  );
  navbarList.appendChild(createNavLink("nav-item", null, "Your Todos"));
  navbarList.appendChild(createNavLink("nav-item", null, "Your Project"));

  navBar.appendChild(navbarList);
  headerContainer.appendChild(navBar);

  const modal = addTaskModal();
  headerContainer.appendChild(modal);
  navBar.addEventListener("click", function (event) {
    if (event.target.id === "addTaskButton") {
      modal.showModal();
    }
  });

  body.appendChild(headerContainer);
}

function createNavLink(navLinkClass, navLinkHtml = null, navLinkInner = null) {
  const navlink = document.createElement("li");
  navlink.classList.add(navLinkClass);
  if (navLinkHtml === null) {
    navlink.innerText = navLinkInner;
    return navlink;
  } else {
    navlink.appendChild(navLinkHtml);
  }
  return navlink;
}

function createButton(buttonClass, buttonId, buttonText) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.id = buttonId;
  button.innerText = buttonText;
  return button;
}
