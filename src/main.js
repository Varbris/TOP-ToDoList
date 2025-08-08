export function main() {
  const mainContainer = document.createElement("main");
  const articleContainer = document.createElement("article");

  articleContainer.innerHTML = `
  loremIpsum     
`;
  mainContainer.appendChild(articleContainer);
  return mainContainer;
}
