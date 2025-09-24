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
  mainContainer.appendChild(articleContainer);
  body.appendChild(mainContainer);

  if (localStorage.length === 0) {
    articleContainer.innerHTML = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quas adipisci necessitatibus sit consequatur ut veniam. Eum, expedita ipsum? Saepe quam placeat velit doloribus sunt itaque assumenda earum sit, minima reiciendis et. Beatae magnam ullam ducimus eveniet vitae eos consequuntur consectetur, sunt voluptate excepturi ex? Iusto tenetur quam doloribus, perferendis quasi adipisci animi ut deleniti culpa placeat, sunt consectetur distinctio, ullam dolore at consequatur itaque. Voluptatibus fugit enim soluta inventore veritatis officiis fugiat exercitationem provident architecto, et molestias placeat. Ex placeat, quod quibusdam minima a obcaecati nobis nostrum unde et eaque impedit consequuntur earum delectus eius ea iure possimus assumenda.    
`;
  } else {
    updateArticle(window.location.pathname);
  }
}

function updateArticle(currentPath) {
  const article = document.getElementById("article");
  article.classList.add("article");
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
  if (data === null) {
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
    const myProjectList = myLocal().getStorage("myProject");
    myProjectList.forEach(function (element) {
      console.log(element, currentPath);
      if (element.data === currentPath) {
        generateYourTodos(data, currentPath, article);
      }
    });
  }
}

function generateYourTodos(data, currentPath, container) {
  data.forEach(function (item) {
    let date =
      item.date === "No Date"
        ? item.date
        : format(
            new Date(item.date[0], item.date[1] - 1, item.date[2]),
            "y-MMM-d"
          );
    const pDate = createCustomElement("p");
    pDate.addInner(date);
    const card = createCard(item.title, item.description);
    const href = createCustomElement("a");
    const div = createCustomElement("div");
    div.addAttribute("class", "priority-box");
    div.addInner((document.createElement("p").innerText = item.priority));
    const p = document.createElement("p");
    p.innerText = currentPath;
    div.addChild(p);
    href.addAttribute("href", "https://google.com");
    href.addInner(item.priority);
    card.appendBody(pDate.element);
    card.appendBody(div.element);

    container.appendChild(card.card);
  });
}

function generateMyProject(data, currentPath, container) {
  const h1 = createCustomElement("h1");
  h1.addInner("My Project");
  container.appendChild(h1.element);
  data.forEach(function (element) {
    const a = createCustomElement("a");

    a.addInner(element.title);
    a.addAttribute("href", `/${currentPath}/${element.data}`);
    container.appendChild(a.element);
  });
}

export { main, updateArticle };
