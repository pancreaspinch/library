const library = document.querySelector('#library');
const form = document.querySelector('#form');
const formContainer = document.querySelector('#formContainer')
const newBtn = document.querySelector('#newBtn')
const closeBtn = document.getElementsByClassName("close")[0];

//New button Event listener
newBtn.addEventListener('click', () => formContainer.style.display = 'block');
closeBtn.addEventListener('click', () => formContainer.style.display = 'none');
//Submit button event listener
form.addEventListener('submit', (e) => {
    //Default behavior of submit refreshes the page
    e.preventDefault();
    formContainer.style.display = 'none';
    addBookToLibrary();
});

let myLibrary = [];

class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "0",
        isRead = "false"
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

//Creates a new book then adds it to the library
//Saves to local storage 
//Displays the book on the library
function addBookToLibrary() {
    let newBook = new Book(title.value, author.value, pages.value, isRead.checked)
    myLibrary.push(newBook);
    saveLibrary();
    render();
    form.reset();

}

// Behavior where every time I render I have to render the entire page
// Need to revisit after learning frameworks
function render() {
    const books = document.querySelectorAll('.book');
    books.forEach((book) => library.removeChild(book));
    myLibrary.forEach(book => createBook(book));
}

//Creates the HTML for each book
function createBook(book) {
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    //Book
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(book))

    //Book data fields
    titleDiv.textContent = book.title;
    titleDiv.classList.add('title');

    authorDiv.textContent = book.author;
    authorDiv.classList.add('author');

    pagesDiv.textContent = book.pages;
    pagesDiv.classList.add('pages');

    //Read button toggle for read status
    book.isRead ? readBtn.textContent = 'Read' : readBtn.textContent = 'Not read';
    readBtn.classList.add('readBtn');

    //Delete button + event listener
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');

    readBtn.addEventListener('click', () => {
        book.isRead = !book.isRead;
        saveLibrary();
        render();
    });

    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        saveLibrary();
        render();
    });

    //Append data fields to book
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(deleteBtn);

    //Append book to library
    library.appendChild(bookDiv);
}

//Saves library to local storage using stringify
function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//Pulls library from local storage using parse
function renderLibrary() {
    if (localStorage.myLibrary) {
        let library = localStorage.getItem('myLibrary');
        library = JSON.parse(library);
        myLibrary = library;
        render();
    }
}

renderLibrary();
