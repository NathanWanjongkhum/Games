"use strict";
var tasksData = {
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
};
// Templates
var taskRowTemplate = document.getElementById("task-row-template");
var taskListRowTemplate = document.getElementById("tasklist-row-template");
var groupRowTemplate = document.getElementById("group-row-template");
// Dom Cache
var taskList = document.getElementById("tasks-list");
var taskListList = document.getElementById("group-blueprints-list");
var groupList = document.getElementById("groups-list");
// Data
var botPopulation = 1;
var tasks = [];
var taskLists = [];
var groups = [];
function capitalizeFirstLetters(string) {
    var text = string
        .split(" ")
        .map(function (s) { return s.charAt(0).toUpperCase() + s.substring(1); })
        .join(" ");
    return text;
}
function initGroup(data) {
    // TODO Handle unknown taskLists
    if (botPopulation < data.population)
        data.population = botPopulation;
    var group = {
        id: groups.length,
        population: data.population,
        taskListRef: data.taskListRef,
        currentTaskIndex: 0,
    };
    groups.push(group);
    createGroup(group);
}
function createGroup(group) {
    var groupRow = groupRowTemplate.content.firstElementChild.cloneNode(true);
    updateGroup(groupRow, group);
    groupList.appendChild(groupRow);
}
function updateGroup(groupRow, group) {
    var children = groupRow.children;
    children[0].textContent = capitalizeFirstLetters(group.taskListRef);
    children[1].textContent = group.id.toString();
    children[2].textContent = group.population.toString();
    children[3].textContent = group.currentTaskIndex.toString();
}
function initTask(key) {
    var task = tasksData[key];
    tasks.push(task);
    createTask(task);
}
function createTask(task) {
    var taskRow = taskRowTemplate.content.firstElementChild.cloneNode(true);
    updateTask(taskRow, task);
    taskList.appendChild(taskRow);
}
function updateTask(taskRow, task) {
    var children = taskRow.children;
    children[0].textContent = task.name;
    children[1].textContent = task.effect;
    children[2].textContent = task.duration.toString();
}
function initTaskList(name, tasks) {
    var taskList = {
        name: name,
        taskList: new Map(tasks.map(function (task, index) { return [index, task]; })),
    };
    taskLists.push(taskList);
    createTaskList(taskList);
}
function createTaskList(taskList) {
    var taskListRow = taskListRowTemplate.content.firstElementChild.cloneNode(true);
    updateTaskList(taskListRow, taskList);
    taskListList.appendChild(taskListRow);
}
function updateTaskList(taskListRow, taskList) {
    var children = taskListRow.children;
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
