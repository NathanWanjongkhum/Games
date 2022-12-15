interface Task {
  name: string;
  duration: number;
  effect: string;
}
interface TaskList {
  name: string;
  taskList: Map<number, Task>;
}
interface Group {
  id: number;
  population: number;

  taskListRef: string;
  currentTaskIndex: number;

  input?: [];
  output?: [];
}

interface IO_Stream {
  // <ID, Port>
  source: Record<number, number>;
  target: Record<number, number>;
}
interface NodeFactory {
  groups: Group[];
  streams: IO_Stream[];
}

const tasksData: { [key: string]: Task } = {
  inactive: {
    name: "Inactive",
    duration: 1000,
    effect: "placeholder",
  },
  harvest: {
    name: "harvest",
    duration: 1000,
    effect: "placeholder",
  },
} as const;

// Templates
const taskRowTemplate = document.getElementById(
  "task-row-template"
) as HTMLTemplateElement;
const taskListRowTemplate = document.getElementById(
  "tasklist-row-template"
) as HTMLTemplateElement;
const groupRowTemplate = document.getElementById(
  "group-row-template"
) as HTMLTemplateElement;

// Dom Cache
const taskList = document.getElementById("tasks-list")!;
const taskListList = document.getElementById("group-blueprints-list")!;
const groupList = document.getElementById("groups-list")!;

// Data
const assets = {
  botPopulation: 1,
  matter: 0,
};

var tasks: Task[] = [];
var taskLists: TaskList[] = [];
var groups: Group[] = [];

function capitalizeFirstLetters(string: string) {
  const text = string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return text;
}

function initGroup(data: any) {
  if (!taskLists.includes(data.taskListRef)) return;
  if (assets.botPopulation < data.population)
    data.population = assets.botPopulation;

  const group: Group = {
    id: groups.length,
    population: data.population,
    taskListRef: data.taskListRef,
    currentTaskIndex: 0,
  };

  groups.push(group);

  createGroup(group);
}
function createGroup(group: Group) {
  const groupRow = groupRowTemplate.content.firstElementChild!.cloneNode(true);
  updateGroup(groupRow, group);
  groupList.appendChild(groupRow);
}
function updateGroup(groupRow: Node, group: Group) {
  const children = (groupRow as HTMLElement).children;

  children[0].textContent = capitalizeFirstLetters(group.taskListRef);
  children[1].textContent = group.id.toString();
  children[2].textContent = group.population.toString();
  children[3].textContent = group.currentTaskIndex.toString();
}

function initTask(key: string) {
  const task: Task = tasksData[key];

  tasks.push(task);

  createTask(task);
}
function createTask(task: Task) {
  const taskRow = taskRowTemplate.content.firstElementChild!.cloneNode(true);
  updateTask(taskRow, task);
  taskList.appendChild(taskRow);
}
function updateTask(taskRow: Node, task: Task) {
  const children = (taskRow as HTMLElement).children;

  children[0].textContent = task.name;
  children[1].textContent = task.effect;
  children[2].textContent = task.duration.toString();
}

function initTaskList(name: string, tasks: Task[] | []) {
  const taskList: TaskList = {
    name: name,
    taskList: new Map(tasks.map((task, index) => [index, task])),
  };

  taskLists.push(taskList);

  createTaskList(taskList);
}
function createTaskList(taskList: TaskList) {
  const taskListRow =
    taskListRowTemplate.content.firstElementChild!.cloneNode(true);
  updateTaskList(taskListRow, taskList);
  taskListList.appendChild(taskListRow);
}
function updateTaskList(taskListRow: Node, taskList: TaskList) {
  const children = (taskListRow as HTMLElement).children;

  children[0].textContent = taskList.name;
  children[1].textContent = taskList.taskList.size.toString();
}

(function init() {
  initTask("inactive");

  initTaskList("Harvesters", []);

  initGroup({
    taskListRef: "inactive",
    population: 1,
  });
})();
