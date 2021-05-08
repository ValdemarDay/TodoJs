"use strict";
const ourInput = document.querySelector("#our_input");
const todoList = document.querySelector(".todo-list");
const todoForm = document.querySelector("#todo-form");
const todoSearch = document.querySelector("#todo-search");
const todoCompleted = document.querySelector(".todo-completed");
const todoSelect = document.querySelector("#todo-select");
const Myselect = document.querySelector("#myselect");
console.log("todoList", todoList);
console.log("ourInput", ourInput);
console.log("todoForm", todoForm);
console.log("todo-search", todoSearch);

let allTodos = [];

let completedTodo;

let currentInputValue = "";

let currentFilter = "all";

ourInput.addEventListener("input", (e) => {
    currentInputValue = e.target.value;
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (ourInput.value !== "") {
        const todo = document.createElement("div");
        todo.classList.add("todo-element");
        todo.classList.add("todo-active");
        todo.innerText = ourInput.value;
        const todoButtons = document.createElement("div");
        const buttonComplete = document.createElement("input");
        todoButtons.appendChild(buttonComplete);
        buttonComplete.setAttribute("type", "button");
        buttonComplete.setAttribute("value", "✓");
        buttonComplete.classList.add("todo-button-complete");
        const buttonDelete = document.createElement("input");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.setAttribute("value", "🗑");
        buttonDelete.classList.add("todo-button-delete");
        todoButtons.appendChild(buttonDelete);
        todoButtons.classList.add("todo-button-complete");
        todoButtons.classList.add("todo-button-delete");
        todoList.appendChild(todo);
        todo.appendChild(todoButtons);
        buttonDelete.addEventListener("click", () => {
            todoList.removeChild(todo);
            allTodos = allTodos.filter((selectedTodo) => {
                return todo.innerText !== selectedTodo.innerText;
            });
        });
        buttonComplete.addEventListener("click", (e) => {
            todo.classList.add("todo-complete");
            todo.classList.remove("todo-active");
            if (currentFilter == "Active") {
                todo.style.display = "none";
            }
            console.log("todo-complete");
        });
        allTodos.push(todo);
        ourInput.value = "";
    }
});

Myselect.addEventListener("change", (e) => {
    allTodos.forEach((todo) => {
        if (e.target.value == "Complete") {
            if (todo.classList.contains("todo-complete")) {
                todo.classList.remove("todo-active");
            }
            if (todo.classList.contains("todo-complete")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            currentFilter = "Complete";
            console.log(currentFilter);
        }
        if (todo.classList.contains("todo-active")) {
            todo.style.display = "none";
        }
        if (e.target.value == "Active") {
            allTodos.forEach((todo) => {
                if (todo.classList.contains("todo-active")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            });
            currentFilter = "Active";
            console.log(currentFilter);
        }
        if (e.target.value == "All") {
            allTodos.forEach((todo) => {
                todo.style.display = "flex";
            });
            currentFilter = "All";
            console.log(currentFilter);
        }
    });
});

todoSearch.addEventListener("input", (e) => {
    allTodos.forEach((todo) => {
        if (currentFilter == "Complete") {
            if (todo.classList.contains("todo-complete")) {
                if (
                    todo.innerText
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                ) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            }
            if (todo.classList.contains("todo-active")) {
                todo.style.display = "none";
            }
        }
        if (currentFilter == "Active") {
            if (todo.classList.contains("todo-active")) {
                if (
                    todo.innerText
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                ) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            }
            if (todo.classList.contains("todo-complete")) {
                todo.style.display = "none";
            }
        }
        if (currentFilter == "All") {
            if (
                todo.innerText
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            ) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    });
    console.log(allTodos.includes(e.target.value));
});

