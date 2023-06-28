const list = document.querySelector("#list");

const globalList = [];

const ui = {
  addTask(task) {
    if (task.trim().length === 0) {
      return;
    }
    globalList.push(task);
    this.reloadList();
  },

  reloadList() {
    list.innerHTML = "";
    globalList.map((task) => {
      const node = document.createElement("li");
      node.classList.add("col", "d-flex", "align-items-center", "column-gap-3");
      node.innerHTML += `
        <input type="checkbox" id="example" />
        <label for="example">${task}</label>
        <div class="fs-4 m-0 ms-auto" role="button">x</div>
      `;
      list.appendChild(node);
    });
  },
};

const fomr = document
  .querySelector("#formTask")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const txtTask = document.querySelector("#txtTask").value;
    ui.addTask(txtTask);
  });
