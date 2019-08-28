// This class represents each book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//This class represents all the methods in UI
class UI{
    //method to display books
    static displayBook(){
        // //Imaginary local storage for trial purpose
        // const bookstore=[
        //     {
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '345678'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Nobel Reo',
        //         isbn: '348982'
        //     }
        // ];
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    //method to add the books to the list
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const li = document.createElement('tr');
        li.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(li);
    }
    //method to delete the book from the list
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    //method to clear the form after submition
    static clearField(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    //method that run based on message and className either (success/failure)
    static alert(message,className){
        const div=document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        //Setting the timeout so that the alert disappears in 2sec
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
}


//Create local storage
class Store{
    //method to get the books from local store
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    //method to add books to the local store
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        //update the books in local storage
        localStorage.setItem('books',JSON.stringify(books));
    }
    //method to remove books from local store
    static removeBooks(isbn){
        const books=Store.getBooks();
        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        //update the books in local storage
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//Display books in the storage area
document.addEventListener('DOMContentLoaded' , UI.displayBook);

//Add books
document.querySelector('#book-form').addEventListener('submit' , (e) =>{
    e.preventDefault();
    //get the value from the form
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate the input
    if(title==='' || author==='' || isbn===''){
        UI.alert('Please fill all the fields' , 'danger');
    }else{
        //The book class is used to add books to the list
        const book = new Book(title , author , isbn);
        //Add book to the UI
        UI.addBookToList(book);

        //Add to store
        Store.addBooks(book);

        //Show success message
        UI.alert('Book added to the List' , 'success');

        //Clear the field
        UI.clearField();
    }
});


//Delete books
document.querySelector('#book-list').addEventListener('click' , (e) =>{
    //Remove book from UI
    UI.deleteBook(e.target);
    //Remove book from Store
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    UI.alert('Deleted successfully' , 'success');
});