import { createCard } from "./create";

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
  currentPath = currentPath.replace("/", "");
  const data = JSON.parse(localStorage.getItem(currentPath));

  //!fix this when data is missing from local storage
  if (data === null) {
    return 0;
  }
  if (currentPath !== "/" && currentPath !== "") {
    const article = document.getElementById("article");
    article.classList.add("article");
    article.innerHTML = "";

    data.forEach(function (item) {
      let date =
        item.date === "No Date"
          ? item.date
          : format(
              new Date(item.date[0], item.date[1] - 1, item.date[2]),
              "y-MMM-d"
            );
      const card = createCard(item.title, item.description);
      card.addNewItem("p", date);
      article.appendChild(card.card);
    });
  }
}
export { main, updateArticle };
