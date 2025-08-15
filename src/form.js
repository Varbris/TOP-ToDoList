import { createButton } from "./create.js";

export default class Form {
  constructor() {
    this.form = document.createElement("form");
  }

  get myForm() {
    return this.form;
  }

  addInputField(type, title) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    const label = document.createElement("label");
    label.setAttribute("for", title);
    label.innerText = title;
    const inputField = document.createElement("input");
    inputField.setAttribute("type", type);
    inputField.setAttribute("id", title);
    inputField.setAttribute("name", title);
    div.appendChild(label);
    div.appendChild(inputField);

    this.form.appendChild(div);
  }

  addButton(buttonClass, buttonId, buttonText) {
    const button = createButton(buttonClass, buttonId, buttonText);
    this.form.appendChild(button);
  }
}
