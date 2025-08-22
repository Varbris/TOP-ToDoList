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

function createAnchor(anchorName, link) {
  const element = document.createElement("a");
  element.setAttribute("href", link);
  element.innerText = anchorName;
  return element;
}

function createCustomElement(tagName, inner, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.appendChild(inner);
  return element;
}

function createButton(buttonClass, buttonId, buttonText) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.id = buttonId;
  button.innerText = buttonText;
  return button;
}

function createCard(title, description) {
  const titleH1 = document.createElement("h1");
  const card = document.createElement("div");
  const cardHeader = document.createElement("div");
  const cardBody = document.createElement("div");
  const pDesc = document.createElement("p");

  cardHeader.setAttribute("class", "card-header");
  card.setAttribute("class", "card");
  cardBody.setAttribute("class", "card-body");
  titleH1.innerText = title;
  pDesc.innerText = description;
  cardBody.append(pDesc);
  cardHeader.appendChild(titleH1);
  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  const addNewItem = function (element, itemInner) {
    const newItem = document.createElement(element);
    newItem.innerText = itemInner;
    cardBody.appendChild(newItem);
  };

  return { card: card, addNewItem: addNewItem };
}

export {
  createButton,
  createNavLink,
  createAnchor,
  createCard,
  createCustomElement,
};
