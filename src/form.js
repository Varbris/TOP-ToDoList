import { format } from "date-fns";
import { createButton } from "./create.js";

export default class Form {
  constructor() {
    this.form = document.createElement("form");
    this.form.setAttribute("method", "post");
  }

  get myForm() {
    return this.form;
  }

  insertInputAfter(referenceNode, newNode) {
    console.log(referenceNode, referenceNode.parentNode, newNode);
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  addInputField(type, title, data = null) {
    const div = document.createElement("div");
    div.classList.add("form-row");
    const label = document.createElement("label");
    label.setAttribute("for", title);
    label.innerText = title;
    const inputField = document.createElement("input");
    inputField.setAttribute("type", type);
    inputField.setAttribute("id", title);
    inputField.setAttribute("name", title);
    if (data !== null) {
      if (Array.isArray(data) && type === "date") {
        console.log();
        inputField.setAttribute(
          "value",
          format(new Date(data[0], data[1] - 1, data[2]), "y-MM-dd")
        );
      } else {
        inputField.setAttribute("value", data);
      }
    }
    div.append(label);
    div.append(inputField);

    this.form.append(div);
  }

  addDropDown(title, selectOption, id) {
    if (!Array.isArray(selectOption)) {
      console.warn("the second parameter for this method, expected array data");
      return;
    }
    const div = document.createElement("div");
    div.classList.add("form-row");
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = title;
    const select = document.createElement("select");
    select.setAttribute("id", id);
    select.setAttribute("name", id);
    selectOption.forEach((element) => {
      select.append(element);
    });
    div.appendChild(label);
    div.appendChild(select);
    this.form.appendChild(div);
  }

  addDropdownOption(value, name, data = null) {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    if (data !== null && data === value) {
      option.setAttribute("selected", "selected");
    }
    option.innerText = name;
    return option;
  }

  addButton(buttonClass, buttonId, buttonText) {
    const button = createButton(buttonClass, buttonId, buttonText);
    button.setAttribute("type", "submit");
    this.form.appendChild(button);
  }
}
