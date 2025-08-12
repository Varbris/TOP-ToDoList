function addTaskModal() {
  const modal = document.createElement("dialog");
  const form = document.createElement("form");
  const addButton = document.createElement("button");
  addButton.innerText = "add Task";
  form.innerHTML = /* HTML */ `
    <div class="form-row">
      <label for="title">Title</label>
      <input type="text" id="title" />
    </div>
  `;
  addButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("awikwok");
  });
  form.append(addButton);
  modal.appendChild(form);

  return modal;
}

export { addTaskModal };
