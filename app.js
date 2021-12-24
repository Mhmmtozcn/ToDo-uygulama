// Tüm elementleri seçme

const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const taskList = document.querySelector('#task-list');
const btnDeleteAll = document.querySelector('#btnDeleteAll');

// addEventListerları tek bir fonksiyon içerisinde toplama ve çağırma
addEventListeners();

function addEventListeners() {
    form.addEventListener('submit', addNewItem);
    taskList.addEventListener('click', deleteItem);
    btnDeleteAll.addEventListener('click', deleteItemAll);
    document.addEventListener('DOMContentLoaded', loadAllTodoToUI);
}

// Sayfa yüklendiğinde bütün todoların ekrana gelmesi

function loadAllTodoToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        creatTodo(todo);
    });

}

// Ekliyeceğimiz todonun html etiketlerini oluşturma

function creatTodo(newTodo) {
    const li = document.createElement('li');
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    const a = document.createElement('a');
    a.classList = "delete-item float-right";
    a.setAttribute('href', '#');

    const i = document.createElement('i');
    i.classList = "fas fa-times";

    a.appendChild(i);
    li.appendChild(a);
    taskList.appendChild(li);
}

// Todo ekleme

function addNewItem(e) {
    let newTodo = input.value.trim();

    if (input.value.trim() === '') {
        alert('Lütfen bir değer giriniz')
    }
    else {
        creatTodo(newTodo);
        addTodoToStorage(newTodo); //Localstorage ekleme
    }
    input.value = '';
    e.preventDefault();
}

// Localstorage'dan todoları almak

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// Localstorage'a todoları ekleme

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

// To do silme işlemi

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent); // Localstorage'dan silme
    }
    e.preventDefault();
}

// Todoları Localstorage'dan silme

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Tüm todoları silme

function deleteItemAll(e) {
    confirm('Hepsini silmek istediğinizden emin misiniz?')
    taskList.innerHTML = '';
    localStorage.removeItem("todos"); // Localstorage'dan tümünü silme
    e.preventDefault();
}

