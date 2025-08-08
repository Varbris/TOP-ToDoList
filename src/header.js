export function header() {
  const headerContainer = document.createElement("header");
  const navBar = document.createElement("nav");

  navBar.innerHTML = `
        <ul>
          <li><a href="">Your Todos</a></li>
          <li><a href="">Your Project</a></li>
        </ul>
`;
  headerContainer.appendChild(navBar);
  return headerContainer;
}
