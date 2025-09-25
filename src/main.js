import {
  createCard,
  createCustomElement,
  createAnchor,
  createNavLi,
} from "./create";
import myLocal from "./myLocal";

const { format } = require("date-fns");

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
  console.log(article);
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
  console.log(currentPath);
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
    container.innerText = "You Dont have Any Data !, just add some task dude";
  } else {
    for (let i = 0; i < data.length; i++) {
      let date =
        data[i].date === "No Date"
          ? data[i].date
          : format(
              new Date(data[i].date[0], data[i].date[1] - 1, data[i].date[2]),
              "y-MMM-d"
            );
      const pDate = createCustomElement("p");
      pDate.addInner(date);
      const card = createCard(data[i].title, data[i].description);
      const href = createCustomElement("a");
      const div1 = createCustomElement("div");
      const controlDiv = createCustomElement("div");
      controlDiv.addAttribute("class", "card-control");
      const controlBtn = ["Delete", "Edit"];
      controlBtn.forEach((element) => {
        const btn = createCustomElement("button");
        btn.addAttribute("id", element + "TodosBtn");
        btn.addInner(element);
        btn.addAttribute("data-id");
        btn.addAttribute("data-id", data[i].id);
        btn.addEvent("click", function (event) {
          if (
            element === "Delete" &&
            data[i].id === Number(event.target.dataset.id)
          ) {
            data.splice(i, 1);
            myLocal().setStorage(currentPath, data);
            generateYourTodos(data, currentPath, container);
          }
        });
        controlDiv.addChild(btn.element);
      });

      div1.addAttribute("class", "priority-box");
      div1.addInner((document.createElement("p").innerText = data[i].priority));
      const p = document.createElement("p");
      p.innerText = currentPath;
      div1.addChild(p);
      href.addAttribute("href", "https://google.com");
      href.addInner(data[i].priority);
      card.appendBody(pDate.element);
      card.appendBody(div1.element);
      card.addToCard(controlDiv.element);

      container.appendChild(card.card);
    }
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
