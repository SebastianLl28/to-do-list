const list = document.querySelector("#list");

//
document.querySelectorAll('input[type="radio"]').forEach((element) => {
  element.addEventListener("change", () => {
    if (element.checked) {
      switch (element.id) {
        case "rdb1":
          GlobalList.statusList = "all";
          ui.reloadList();
          return;
        case "rdb2":
          GlobalList.statusList = "completed";
          ui.reloadList();
          return;
        default:
          GlobalList.statusList = "No completed";
          ui.reloadList();
          return;
      }
    }
  });
});

//
class Task {
  constructor(id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
  }
}

const GlobalList = {
  list: [],
  statusList: "all",

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
    if (this.statusList === "all") {
      return this.list;
    } else if (this.statusList === "completed") {
      return this.list.filter((element) => {
        if (element.status) {
          return element;
        }
      });
    }
    return this.list.filter((element) => {
      if (!element.status) {
        return element;
      }
    });
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
    GlobalList.getList().map(({ id, name, status }) => {
      const node = createNode(
        "li",
        ["col", "d-flex", "align-items-center", "column-gap-3"],
        ["data-id", id],
        ""
      );
      const nodeExit = createNode(
        "div",
        ["fs-4", "m-0", "ms-auto"],
        ["role", "button"],
        "x"
      );

      nodeExit.addEventListener("click", () => this.deleteTask(id));
      node.addEventListener("change", () => this.changeStatus(id));

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

document.querySelector("#formTask").addEventListener("submit", (e) => {
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

const createNode = (element, classList, atribute, content) => {
  const node = document.createElement(element);
  node.classList.add(...classList);
  node.setAttribute(atribute[0], atribute[1]);
  node.innerHTML = content;
  return node;
};
