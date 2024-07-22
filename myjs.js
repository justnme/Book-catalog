const form = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const genreInput = document.getElementById('genre');

let books = [];

if (localStorage.getItem('books')) {
    
    books = JSON.parse(localStorage.getItem('books'));
    displayBooks();
}


function addBook(e) {
    
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const year = yearInput.value;
    const genre = genreInput.value;


    if (title === '' || author === '' || year === '' || genre === '') {
        alert('Please fill in all fields.');
        return;
    }

    const book = {
        title,
        author,
        year,
        genre
    };

    books.push(book);
    displayBooks();
    form.reset();

    
    localStorage.setItem('books', JSON.stringify(books));

}

form.addEventListener('submit', addBook);

function displayBooks() {
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');

        bookItem.innerHTML = `
            <div>
                <strong>${book.title}</strong> - ${book.author} (${book.year}) - Genre: ${book.genre}
            </div>
            <div>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </div>
        `;

        bookList.appendChild(bookItem);

        const buttons = bookItem.getElementsByTagName('button');
        const editButton = buttons[0];
        const deleteButton = buttons[1];
        

        editButton.addEventListener('click', editBook);
        deleteButton.addEventListener('click', deleteBook);
    });
}

function editBook(e) {
    const index = e.target.dataset.index;

    const editForm = document.getElementById('edit-book-form');
    const editTitle = document.getElementById('edit-title');
    const editAuthor = document.getElementById('edit-author');
    const editYear = document.getElementById('edit-year');
    const editGenre = document.getElementById('edit-genre');

    editTitle.value = books[index].title;
    editAuthor.value = books[index].author;
    editYear.value = books[index].year;
    editGenre.value = books[index].genre;

    editForm.style.display = 'block';

    editForm.onsubmit = function(e) {
        e.preventDefault();

        if (editTitle.value && editAuthor.value && editYear.value && editGenre.value) {
            books[index].title = editTitle.value;
            books[index].author = editAuthor.value;
            books[index].year = editYear.value;
            books[index].genre = editGenre.value;
            displayBooks();
        }

        editForm.style.display = 'none';

    };
}

function deleteBook(e) {
    const index = e.target.dataset.index;
    books.splice(index, 1);
    displayBooks();
}


function sortBooksByTitle() {
    books.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
    displayBooks();
}

function sortBooksByAuthor() {
    books.sort((a, b) => {
        if (a.author < b.author) return -1;
        if (a.author > b.author) return 1;
        return 0;
    });
    displayBooks();
}

function sortBooksByYear() {
    books.sort((a, b) => a.year - b.year);
    displayBooks();
}

function sortBooksByGenre() {
    books.sort((a, b) => {
        if (a.genre < b.genre) return -1;
        if (a.genre > b.genre) return 1;
        return 0;
    });
    displayBooks();
}


document.getElementById('sort-title').addEventListener('click', sortBooksByTitle);
document.getElementById('sort-author').addEventListener('click', sortBooksByAuthor);
document.getElementById('sort-year').addEventListener('click', sortBooksByYear);
document.getElementById('sort-genre').addEventListener('click', sortBooksByGenre);

function filterBooks() {
    const filterGenre = document.getElementById('filter-genre').value;
    const filterAuthor = document.getElementById('filter-author').value.toLowerCase(); 
    const filterTitle = document.getElementById('filter-title').value.toLowerCase(); 
    const filterYear = parseInt(document.getElementById('filter-year').value);

    const filteredBooks = books.filter(book => {
        return (
            (filterGenre === '' || book.genre === filterGenre) &&
            (filterAuthor === '' || book.author.toLowerCase().includes(filterAuthor)) &&
            (filterTitle === '' || book.title.toLowerCase().includes(filterTitle)) &&
            (isNaN(filterYear) || book.year === filterYear)
        );
    });

    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');

        bookItem.innerHTML = `
    <div>
        <strong>${book.title}</strong> - ${book.author} (${book.year}) - Genre: ${book.genre}
    </div>
    <div>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
    </div>
`;

        bookList.appendChild(bookItem);

        const buttons = bookItem.getElementsByTagName('button');
        const editButton = buttons[0];
        const deleteButton = buttons[1];
        

        editButton.addEventListener('click', editBook);
        deleteButton.addEventListener('click', deleteBook);
    });
}
document.getElementById('filter-button').addEventListener('click', filterBooks);




displayBooks();
