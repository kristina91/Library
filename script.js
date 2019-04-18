let books = [];
let bookID = 1;

const send = document.querySelector('.send');
const book = document.querySelector('#txtBook');
const author = document.querySelector('#txtAuthor');
const pages = document.querySelector('#numPage');
let read = document.querySelector('input[name="radio"]:checked');
const list = document.querySelector('#booksList');

// constructor
function Book(book, author, pages, read){
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = bookID++;
}

// function to add a book to array
function addBook(bookObj) {
    books.push(bookObj);
    // adding to local storage
    localStorage.setItem('books', JSON.stringify(books));
}

// function to delete a book from array
function deleteBook(id) {
    books.forEach(function(bookObj, index){
        if(bookObj.id == id){
            books.splice(index, 1);
        }
    });
    // adding to local storage
    localStorage.setItem('books', JSON.stringify(books));
}

// function to change status in table
function changeStatus(id) {
    books.forEach(function(bookObj){
        if(bookObj.id == id){
            bookObj.read = !(bookObj.read);
        }
    });
    // adding to local storage
    localStorage.setItem('books', JSON.stringify(books));
}

// function to view book in table
function viewBookInTable(bookObj){
    let row = document.createElement('tr');
    row.id = bookObj.id;

    let title = document.createElement('td');
    title.textContent = bookObj.book;
    row.appendChild(title);

    let authorRow = document.createElement('td');
    authorRow.textContent = bookObj.author;
    row.appendChild(authorRow);

    let pagesRow = document.createElement('td');
    pagesRow.textContent = bookObj.pages;
    row.appendChild(pagesRow);

    let readIt = document.createElement('td');
    let readMode = document.createElement('button');
    readMode.textContent = bookObj.read ? 'Not yet' : 'Read it';
    readMode.className = bookObj.read ? 'button readmode readNo' : 'button readmode readYes';
    readIt.appendChild(readMode);
    row.appendChild(readIt);

    let remove = document.createElement('td');
    let removeBook = document.createElement('button');
    removeBook.innerHTML = 'Remove book';
    removeBook.className = 'deletebook alert button';
    remove.appendChild(removeBook);
    row.appendChild(remove);

    list.appendChild(row);

}

// add click event when book is submitted
send.addEventListener('click', function(e){
    e.preventDefault();

    let bookT = book.value;
    let authorT = author.value;
    let pagesT = pages.value;
    let readT = read.value;

    // checking if fields are empty
    if(bookT === "" || authorT === "" || pagesT === "" ){
        alert("You can\'t leave any fields empty :P");
        return
    }

    // creating new object based on user input
    let newBook = new Book(bookT, authorT, pagesT, readT);

    // adding our newly created object to array
    addBook(newBook);

    // showing user input in a table
    viewBookInTable(newBook);
    alert("You added a book successfuly!");

    // reseting form to empty values
    book.value = "";
    author.value = "";
    pages.value = "";
    read = false;
});


// when we click on table
list.addEventListener('click', function(e){
    // returns element which was clicked
    let tar = e.target;
    let targetRow = tar.parentElement.parentElement;


    // does element have certian class
    if(tar.classList.contains('readmode')){
        let hasRead = tar.classList.contains('readNo');
        
        if(hasRead === true){
            tar.textContent = "Read it";
            tar.className = 'button readmode readYes';
        }else {
            tar.textContent = 'Not yet';
            tar.className = 'button readmode readNo';
        }
        /*
        tar.textContent = hasRead ? 'Read it' : 'Not yet';
        tar.className = hasRead ? 'button readmode readYes' : 'button readmode readNo';
        */ 
    }else if(tar.classList.contains('deletebook')){
        deleteBook(targetRow.id);
        targetRow.remove();
        alert("Book removed");
    }
});

// function for checking local storage
function showBookFromLS() {
    // is item books empty?
    if(localStorage.getItem('books') === null) {
      // if it is empty array
      books = [];
    } else {
      // if it isn't save all objects in variable books
      books = JSON.parse(localStorage.getItem('books'));
    }

    // and then show all items in a table
    books.forEach(function (book){
      viewBookInTable(book);
    })
  }
  
  showBookFromLS();