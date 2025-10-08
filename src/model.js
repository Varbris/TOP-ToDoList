import { updateArticle } from "./main";
import myLocal from "./myLocal";

function editSendToEqual(dropDownValue, updatedData, formId) {
  myLocal().createStorage(dropDownValue);
  updatedData.projectName = dropDownValue;
  let myProject = myLocal().getStorage(dropDownValue);
  myProject = myProject.map(function (element) {
    if (element.id === parseInt(formId)) {
      element = updatedData;
      return element;
    } else {
      return element;
    }
  });
  myLocal().setStorage(sendToProject.value, myProject);
}

function editSendToNotEqual(dropDownValue, previousData, updatedData) {
  let myProject = myLocal().getStorage(dropDownValue);
  updatedData.projectName = dropDownValue;
  deleteData(previousData, previousData.projectName);
  myProject.push(updatedData);
  myLocal().setStorage(dropDownValue, myProject);
}

function deleteData(data, currentPath) {
  const getData = myLocal().getStorage(currentPath);
  getData.forEach(function (element, index) {
    if (element.id === data.id) {
      getData.splice(index, 1);
      myLocal().setStorage(currentPath, getData);
      updateArticle(currentPath);
    }
  });
}

export { editSendToEqual, editSendToNotEqual, deleteData };
