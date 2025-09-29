import { addProjectModal, addTaskModal } from "./modal.js";
import { updateArticle } from "./main.js";
function navbarClickEvent(event) {
  const headerContainer = document.getElementById("header");
  const myTaskModal = addTaskModal();
  const myProjectModal = addProjectModal();

  if (event.target.id === "addTaskButton") {
    event.preventDefault();
    event.target.href = "/";
    window.history.pushState({}, "", event.target.href);
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

  if (event.target.id === "addProjectButton" || event.target.id === "addIcon") {
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
}

export { navbarClickEvent };
