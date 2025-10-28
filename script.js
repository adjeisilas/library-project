
const addBtn = document.getElementById('add-btn');
const bookModal = document.getElementById('bookModal');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancel-btn');
const bookForm = document.getElementById('bookForm');
const tbody = document.getElementById('tbody');


let myLibrary = [];


function Book(title, author, pages, date, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.date = date;
  this.status = status;
}

function addBookToLibrary(title, author, pages, date, status) {
  const newBook = new Book(title, author, pages, date, status);
  myLibrary.push(newBook);
  saveLibraryToStorage();
  displayBooks();
}

function displayBooks() {
  tbody.innerHTML = '';
  
  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.date}</td>
      <td><span class="status ${book.status}">${book.status.charAt(0).toUpperCase() + book.status.slice(1)}</span></td>
      <td>
        <button class="action-btn toggle-status-btn" data-index="${index}">Toggle Status</button>
        <button class="action-btn delete-btn" data-index="${index}">Delete</button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteBook);
  });
  
  document.querySelectorAll('.toggle-status-btn').forEach(button => {
    button.addEventListener('click', toggleBookStatus);
  });
}

function deleteBook(e) {
  const index = e.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  saveLibraryToStorage();
  displayBooks();
}

function toggleBookStatus(e) {
  const index = e.target.getAttribute('data-index');
  const book = myLibrary[index];
  
  if (book.status === 'read') {
    book.status = 'reading';
  } else if (book.status === 'reading') {
    book.status = 'unread';
  } else {
    book.status = 'read';
  }
  
  saveLibraryToStorage();
  displayBooks();
}
function saveLibraryToStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function loadLibraryFromStorage() {
  const storedLibrary = localStorage.getItem('myLibrary');
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
    displayBooks();
  }
}
addBtn.addEventListener('click', () => {
  bookModal.style.display = 'block';
  document.getElementById('date').valueAsDate = new Date();
});

closeBtn.addEventListener('click', () => {
  bookModal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
  bookModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === bookModal) {
    bookModal.style.display = 'none';
  }
});
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const date = document.getElementById('date').value;
  const status = document.getElementById('status').value;
  
  addBookToLibrary(title, author, pages, date, status);
  bookForm.reset();
  bookModal.style.display = 'none';
});
loadLibraryFromStorage();