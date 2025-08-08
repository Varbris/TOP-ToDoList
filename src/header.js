export function header() {
  const headerContainer = document.createElement("header");
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");

  navBar.innerHTML = /* HTML */ `
    <div class="brand-container">
      <a href="" class="navbar-brand">
        <h1>To Do List</h1>
      </a>
    </div>
    <ul>
      <li class="nav-item">
        <button class="add-task-button">Add Task</button>
      </li>
      <li class="nav-item"><a href="" class="nav-link">Your Todos</a></li>
      <li class="nav-item"><a href="" class="nav-link">Your Project</a></li>
    </ul>
  `;
  headerContainer.appendChild(navBar);
  return headerContainer;
}
