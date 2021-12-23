// To do eleman ekleme.
// To do eleman çıkarma.
//To do elemanlarını diziden sayfaya aktarma.
// Local Storage ile çalışma.

// ****************************************** //

// To do eleman ekleme işlemi.

const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const taskList = document.querySelector('#task-list');
const btnDeleteAll = document.querySelector('#btnDeleteAll');

form.addEventListener('submit', addNewItem);

function addNewItem(e) {
    if(input.value === '') {
        alert('Lütfen bir değer giriniz')
    }
    
    const li = document.createElement('li');
    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(input.value));

    const a = document.createElement('a');
    a.classList = "delete-item float-right";
    a.setAttribute('href','#');
    
    const i = document.createElement('i');
    i.classList = "fas fa-times";
    
    a.appendChild(i);
    li.appendChild(a);
    taskList.appendChild(li);
    
    input.value = '';
    e.preventDefault();
}

// To do tek bir elemanı ikona tıklayarak silme işlemi
