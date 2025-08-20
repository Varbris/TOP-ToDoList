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

  addDropDown(title, selectOption) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    const label = document.createElement("label");
    label.setAttribute("for", title);
    label.innerText = title;
    const select = document.createElement("select");
    select.setAttribute("id", title);
    select.setAttribute("name", title);
    selectOption.forEach((element) => {
      select.append(element);
    });
    div.appendChild(label);
    div.appendChild(select);
    this.form.appendChild(div);
  }

  addDropdownOption(value, name) {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerText = name;
    return option;
  }

  addButton(buttonClass, buttonId, buttonText) {
    const button = createButton(buttonClass, buttonId, buttonText);
    this.form.appendChild(button);
  }
}
