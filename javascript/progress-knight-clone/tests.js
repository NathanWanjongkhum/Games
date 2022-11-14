import Task from "./Task.js";
localStorage.clear();

var data = {
  assets: {
    money: 0,
    age: 14,
    happiness: 1,
  },
  tasks: {
    active: {},
    available: {},
  },
};

for (let i = 0; i < 100; i++) {
  data.tasks.available[i.toString()] = new Task(i.toString(), 100);
}

data.assets.age = 50;

localStorage.setItem("data", window.btoa(JSON.stringify(data)));

let _data = JSON.parse(window.atob(localStorage.getItem("data")));
console.log(_data);
