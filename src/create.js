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

function createButton(buttonClass, buttonId, buttonText) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.id = buttonId;
  button.innerText = buttonText;
  return button;
}

export { createButton, createNavLink };
