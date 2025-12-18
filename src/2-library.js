// Problem 2: Composition - Library and Book
// Implement your Book and Library classes below

class Book {
  isAvailable = true;
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Library {
  #books = [];
  #checkedOut = [];
  constructor(name) {
    this.name = name;
  }

  get books() {
    return this.#books;
  }
  get checkedOut() {
    return this.#checkedOut;
  }

  addBook(book) {
    return this.#books.push(book);
  }

  checkoutBook(title) {
    const index = this.#books.findIndex((book) => book.title === title);
    if (index === -1) return false;
    this.#books[index].isAvailable = false;
    this.#checkedOut.push(this.#books[index]);
    this.#books.splice(index, 1);
    return true;
  }

  returnBook(title) {
    const index = this.#checkedOut.findIndex((book) => book.title === title);
    if (index === -1) return false;
    this.#checkedOut[index].isAvailable = true;
    this.#books.push(this.#checkedOut[index]);
    this.#checkedOut.splice(index, 1);
    return true;
  }
}

module.exports = { Book, Library };
