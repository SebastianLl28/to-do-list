const list = document.querySelector("#list");

class Task {
  constructor(id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

const GlobalList = {
  list: [],

  add(task) {
    this.list.push(task);
  },

  deleteById(id) {
    this.list = this.list.filter((element) => {
      if (element.id !== id) {
        return element;
      }
    });
  },

  putStatusById(id) {
    this.list = this.list.map((element) => {
      if (element.id === id) {
        element.status = !element.status;
      }
      return element;
    });
  },

  getList() {
    return this.list;
  },
};

const ui = {
  addTask(task) {
    if (task.name.trim().length === 0) {
      return;
    }
    GlobalList.add(task);
    this.reloadList();
  },

  deleteTask(id) {
    GlobalList.deleteById(id);
    this.reloadList();
  },

  changeStatus(id) {
    GlobalList.putStatusById(id);
    this.reloadList();
  },

  reloadList() {
    list.innerHTML = "";
    GlobalList.list.map(({ id, name, status }) => {
      const node = document.createElement("li");

      const nodeExit = document.createElement("div");
      nodeExit.addEventListener("click", () => this.deleteTask(id));
      nodeExit.classList.add("fs-4", "m-0", "ms-auto");
      nodeExit.setAttribute("role", "button");
      nodeExit.innerHTML = "x";

      node.addEventListener("change", () => this.changeStatus(id));
      node.setAttribute("data-id", id);
      node.classList.add("col", "d-flex", "align-items-center", "column-gap-3");
      node.innerHTML += `
        <input type="checkbox" id=${id} ${status ? "checked" : ""} />
        ${
          status
            ? `<label for=${id}><del>${name}</del></label>`
            : `<label for=${id}>${name}</label>`
        }
        `;
      node.appendChild(nodeExit);
      list.appendChild(node);
    });
  },
};

const fomr = document
  .querySelector("#formTask")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const txtTask = document.querySelector("#txtTask");
    const id =
      Date.now().toString(36) + Math.floor(Math.random() * 100000).toString();
    const objTask = new Task(id, txtTask.value, false);
    if (document.startViewTransition) {
      document.startViewTransition(() => ui.addTask(objTask));
    } else {
      ui.addTask(objTask);
    }
    txtTask.value = "";
  });
