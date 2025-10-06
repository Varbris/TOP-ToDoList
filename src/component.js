import {
  createAnchor,
  createButton,
  createCard,
  createCustomElement,
  createNavLi,
} from "./create";
import addIcon from "./add.png";
import myLocal from "./myLocal.js";
import {
  addProjectSubmitEvent,
  addTaskCancelButtonEvent,
  addTaskFormClickEvent,
  addToDropdownEvent,
  perProjectClickEvent,
} from "./event.js";
import Form from "./form.js";
const { format } = require("date-fns");

//navbar component start///
function createNavbarBrand() {
  const navbarBrand = createCustomElement("div");
  navbarBrand.addChild(createAnchor("To Do List", "/"));
  navbarBrand.addAttribute("class", "brand-container");
  return navbarBrand.element;
}

function createAddTaskButton() {
  return createNavLi(
    "nav-item",
    createButton("add-task-button", "addTaskButton", "Add Task")
  );
}

function createYourTodos() {
  return createNavLi("nav-item", createAnchor("Your Todos", "/YourTodos"));
}

function createYourProject() {
  const projectElement = [
    createAnchor("Your Project", "/myProject"),
    createButton("add-project-btn", "addProjectButton", ""),
  ];
  const myImg = document.createElement("img");
  myImg.setAttribute("src", addIcon);
  myImg.setAttribute("class", "add-icon-hidden");
  myImg.setAttribute("id", "addIcon");

  const myProjectLink = createCustomElement("li");
  myProjectLink.addAttribute("class", "nav-item");
  projectElement.forEach(function (element) {
    if (element.id === "addProjectButton") {
      element.appendChild(myImg);
      myProjectLink.addChild(element);
    } else {
      myProjectLink.addChild(element);
    }
  });

  return myProjectLink.element;
}

function yourProjectList() {
  const projectList = createCustomElement("li");
  projectList.addAttribute("class", "nav-item");
  if (myLocal().isExist("myProject")) {
    projectList.addInner("");

    const myProjectContainer = createCustomElement("div");
    myProjectContainer.addAttribute("class", "my-project");
    const myProjectList = createCustomElement("ul");
    myProjectList.addAttribute("class", "project-list");
    myProjectList.element.innerText = "";

    const myProject = myLocal().getStorage("myProject");
    myProject.forEach((element) => {
      const li = createCustomElement("li");
      li.addAttribute("class", "project-item");
      const a = createAnchor(element.title, "/myProject/" + element.data);
      li.addChild(a);
      a.addEventListener("click", perProjectClickEvent);
      myProjectList.addChild(li.element);
    });
    myProjectContainer.addChild(myProjectList.element);
    projectList.addChild(myProjectContainer.element);
  }
  return projectList.element;
}
//navbar component end//

//modal component start//
function createAddTaskForm(data = "") {
  const testForm = new Form();
  const myForm = testForm.myForm;

  testForm.addInputField("text", "title", data.title);
  testForm.addInputField("text", "description", data.description);
  testForm.addInputField("date", "Due", data.date);

  const projectOption = [
    testForm.addDropdownOption("YourTodos", "Your ToDos", data.safeTo),
    testForm.addDropdownOption("YourProject", "Your Project", data.safeTo),
  ];
  testForm.addDropDown("Add To: ", projectOption, "projectDropDown");

  const priorityOption = [
    testForm.addDropdownOption("Priority1", "Priority 1", data.priority),
    testForm.addDropdownOption("Priority2", "Priority 2", data.priority),
    testForm.addDropdownOption("Priority3", "Priority 3", data.priority),
    testForm.addDropdownOption("Priority4", "Priority 4", data.priority),
  ];
  testForm.addDropDown("Priority: ", priorityOption, "priorityDropDown");
  testForm.addInputField("hidden", "hiddenId", data.id);

  if (data !== null && data !== "" && data.safeTo !== "YourTodos") {
    testForm.insertInputAfter(
      myForm.querySelector("#projectDropDown"),
      createSendToProjectDropDown(data.projectName)
    );
  }

  const taskButton = data === null || data === "" ? "Add" : "Edit";
  testForm.addButton(
    taskButton.toLowerCase() + "-task",
    taskButton.toLowerCase() + "Task",
    taskButton
  );
  testForm.addButton("cancel-button", "cancelButton", "Cancel");

  myForm.addEventListener("change", (event) => {
    addToDropdownEvent(event, testForm);
  });
  return myForm;
}

function createSendToProjectDropDown(data = null) {
  const selectProject = createCustomElement("select");
  selectProject.addAttribute("id", "sendToProject");
  const myProjectData = myLocal().getStorage("myProject");
  selectProject.addInner("");

  if (myProjectData == null) {
    const option = createCustomElement("option");
    option.addInner("You dont have a project");
    selectProject.addChild(option.element);
    selectProject.element.disabled = true;
  } else {
    myProjectData.forEach((element) => {
      const option = createCustomElement("option");
      if (data !== null && data === element.data) {
        option.addAttribute("selected", "selected");
      }
      option.addAttribute("value", element.data);
      option.addInner(element.title);
      selectProject.addChild(option.element);
    });
  }
  return selectProject.element;
}

function createAddProjectForm(modal) {
  const myForm = new Form();
  const getForm = myForm.myForm;
  myForm.addInputField("text", "name");
  myForm.addButton("form-add-project", "formAddProject", "Add Project");
  getForm.addEventListener("submit", function (event) {
    addProjectSubmitEvent(event, modal);
  });
  return getForm;
}

function createTodoCard(data, currentPath) {
  let date =
    data.date === "No Date"
      ? data.date
      : format(
          new Date(data.date[0], data.date[1] - 1, data.date[2]),
          "y-MMM-d"
        );
  const pDate = createCustomElement("p");
  pDate.addInner(date);
  const card = createCard(data.title, data.description);
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
    btn.addAttribute("data-id", data.id);
    controlDiv.addChild(btn.element);
  });

  div1.addAttribute("class", "priority-box");
  div1.addInner((document.createElement("p").innerText = data.priority));
  const p = document.createElement("p");
  p.innerText = currentPath;
  div1.addChild(p);
  href.addAttribute("href", "https://google.com");
  href.addInner(data.priority);
  card.appendBody(pDate.element);
  card.appendBody(div1.element);
  card.addToCard(controlDiv.element);

  return card.card;
}

export {
  createNavbarBrand,
  createAddTaskButton,
  createYourTodos,
  createYourProject,
  yourProjectList,
  createAddTaskForm,
  createSendToProjectDropDown,
  createAddProjectForm,
  createTodoCard,
};
