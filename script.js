const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const emptyListBtn = document.getElementById('empty-list');
const saveListBtn = document.getElementById('save-list');

// Fungsi menambah kegiatan
function addItem() {
    const text = input.value;
    if (text === '') return;

    const li = document.createElement('li');
    li.textContent = text;

    // Double-click untuk menandai selesai
    li.addEventListener('dblclick', () => {
        li.classList.toggle('completed');
    });

    todoList.appendChild(li);
    input.value = '';
}

// Event listener tombol Add
addButton.addEventListener('click', addItem);

// Tekan Enter untuk menambah
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

// Clear Completed: Menghapus yang dicoret
clearCompletedBtn.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('.completed');
    completedItems.forEach(item => item.remove());
});

// Empty List: Menghapus semua
emptyListBtn.addEventListener('click', () => {
    todoList.innerHTML = '';
});

// Save List: Menyimpan ke browser (Local Storage)
saveListBtn.addEventListener('click', () => {
    const items = [];
    document.querySelectorAll('li').forEach(li => {
        items.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTodoList', JSON.stringify(items));
    alert('Daftar berhasil disimpan!');
});

// Memuat data saat halaman dibuka
window.addEventListener('load', () => {
    const savedItems = JSON.parse(localStorage.getItem('myTodoList'));
    if (savedItems) {
        savedItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;
            if (item.completed) li.classList.add('completed');
            li.addEventListener('dblclick', () => li.classList.toggle('completed'));
            todoList.appendChild(li);
        });
    }
});