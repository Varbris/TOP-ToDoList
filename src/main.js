import { createTodoCard } from "./component";
import { createCustomElement, createAnchor, createNavLi } from "./create";
import {
  editTaskFormClickEvent,
  toDoControlButtonEvent,
  toDoEditButtonEvent,
} from "./event";
import myLocal from "./myLocal";

function main() {
  const body = document.getElementById("body");
  const mainContainer = document.createElement("main");
  const articleContainer = document.createElement("article");
  articleContainer.id = "article";
  articleContainer.setAttribute("class", "article");
  mainContainer.appendChild(articleContainer);
  body.appendChild(mainContainer);

  if (localStorage.length === 0) {
    articleContainer.innerHTML = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quas adipisci necessitatibus sit consequatur ut veniam. Eum, expedita ipsum? Saepe quam placeat velit doloribus sunt itaque assumenda earum sit, minima reiciendis et. Beatae magnam ullam ducimus eveniet vitae eos consequuntur consectetur, sunt voluptate excepturi ex? Iusto tenetur quam doloribus, perferendis quasi adipisci animi ut deleniti culpa placeat, sunt consectetur distinctio, ullam dolore at consequatur itaque. Voluptatibus fugit enim soluta inventore veritatis officiis fugiat exercitationem provident architecto, et molestias placeat. Ex placeat, quod quibusdam minima a obcaecati nobis nostrum unde et eaque impedit consequuntur earum delectus eius ea iure possimus assumenda.    
`;
    mainContainer.appendChild(articleContainer);
    body.appendChild(mainContainer);
  } else {
    updateArticle(window.location.pathname);
  }
}

function updateArticle(currentPath) {
  const article = document.getElementById("article");
  article.innerHTML = "";
  currentPath = currentPath.replace("/", "");
  let data;
  if (currentPath.includes("myProject")) {
    currentPath = currentPath.replace("myProject/", "");
    data = myLocal().getStorage(currentPath);
  } else {
    data = myLocal().getStorage(currentPath);
  }

  //!fix this when data is missing from local storage

  if (data === null && currentPath === "YourTodos") {
    article.innerText = "You Dont have Any Data !, just add some task dude";
    return 0;
  } else if (data === null && currentPath === "myProject") {
    article.innerText =
      "You Dont have Any project Data !, just add new Project dude and add some stuff in it";
    return 0;
  }

  if (
    currentPath !== "/" &&
    currentPath !== "" &&
    currentPath === "YourTodos"
  ) {
    generateYourTodos(data, currentPath, article);
  } else if (
    currentPath !== "/" &&
    currentPath !== "" &&
    currentPath === "myProject"
  ) {
    generateMyProject(data, currentPath, article);
  } else {
    generateEachProject(currentPath, data);
  }
}

function generateYourTodos(data, currentPath, container) {
  container.innerText = "";
  if (data === null) {
    const p = document.createElement("p");
    p.innerText = "You Dont have Any Data !, just add some task dude";
    container.appendChild(p);
  } else {
    data.forEach(function (element) {
      const myTodosCard = createTodoCard(element, currentPath);
      myTodosCard
        .querySelector(".card-control")
        .addEventListener("click", function (event) {
          toDoControlButtonEvent(event, element, currentPath, container);
        });
      container.appendChild(myTodosCard);
    });
  }
}

function generateMyProject(projectTitle, currentPath, container) {
  const h1 = createCustomElement("h1");
  h1.addInner("My Project");

  container.appendChild(h1.element);

  projectTitle.forEach(function (element) {
    const projectData = myLocal().getStorage(element.data);
    const a = createCustomElement("a");
    a.addInner(element.title);
    a.addAttribute("href", `/${currentPath}/${element.data}`);
    a.addEvent("click", function (event) {
      event.preventDefault();
      generateEachProject(currentPath, projectData);
    });
    container.appendChild(a.element);
  });
}

function generateEachProject(currentPath, data) {
  const myProjectList = myLocal().getStorage("myProject");
  if (myProjectList === null) {
    return 0;
  }
  myProjectList.forEach(function (element) {
    if (currentPath === "myProject" || element.data === currentPath) {
      generateYourTodos(data, element.title, article);
    } else {
      return 0;
    }
  });
}

export { main, updateArticle };
