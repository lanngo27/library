let myLibrary = [];
const DEFAULT_DATA = [
    { name: "Naruto", author: "Masashi Kishimoto", pages: 1000, status: "Read" },
];
const nameInput = document.querySelector("#nameInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const statusInput = document.querySelector("#statusInput");
const tableBody = document.querySelector("#bookTableBody");
const form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (nameInput.value.length === 0 || authorInput.value.length === 0) {
        alert("Book name and author are compulsory!")
    } else {
        addBookToLibrary();
        displayBooks();
        clearForm();
    }
});

const table = document.querySelector("table").addEventListener("click", (e) => {
    const targetBook = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML === "Delete") {
        if (confirm(`Do you want to delete ${targetBook.innerText}?`)) {
            deleteBook(findBook(targetBook.innerText))
        }
    }
    else if (e.target.classList.contains("statusBtn")) {
        updateStatus(findBook(targetBook.innerText))
    }
    displayBooks();
})

class Book {
    constructor(bookName, author, pages, readStatus) {
        this.name = bookName;
        this.author = author;
        this.pages = pages == "" ? "Unknown" : pages;
        this.status = readStatus;
    }
}

function addBookToLibrary() {
    const newBook = new Book(nameInput.value, authorInput.value
        , pagesInput.value, statusInput.value);
    myLibrary.push(newBook);
}

function updateStatus(bookIdx) {
    if (myLibrary[bookIdx].status === "Read") {
        myLibrary[bookIdx].status = "Not read";
    } else {
        myLibrary[bookIdx].status = "Read";
    }
}

function deleteBook(bookIdx) {
    myLibrary.splice(bookIdx, bookIdx + 1)
}

function findBook(bookName) {
    if (myLibrary.length === 0 || myLibrary === null)
        return;
    for (const book of myLibrary) {
        if (book.name === bookName) {
            return myLibrary.indexOf(book);
        }
    }
}

function clearForm() {
    nameInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.value = "Not read";
}

function displayBooks() {
    tableBody.innerHTML = "";
    myLibrary.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="statusBtn">${book.status}</button></td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>
        `;
        tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

DEFAULT_DATA.forEach(item => {
    myLibrary.push(new Book(item.name, item.author, item.pages, item.status))
});

displayBooks();