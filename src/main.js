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
    updateArticle();
  }
}

function updateArticle() {
  const article = document.getElementById("article");
  article.classList.add("article");
  article.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("myTask"));
  data.forEach(function (item) {
    const titleH1 = document.createElement("h1");
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const pDesc = document.createElement("p");
    const pDate = document.createElement("p");
    cardHeader.setAttribute("class", "card-header");
    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    titleH1.innerText = item.title;
    pDesc.innerText = item.description;
    console.log(item.date[0], item.date[1] - 1, item.date[2]);
    pDate.innerText = format(
      new Date(item.date[0], item.date[1] - 1, item.date[2]),
      "y-MMM-d"
    );
    cardBody.append(pDesc, pDate);
    cardHeader.appendChild(titleH1);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    article.appendChild(card);
  });
}
export { main, updateArticle };
