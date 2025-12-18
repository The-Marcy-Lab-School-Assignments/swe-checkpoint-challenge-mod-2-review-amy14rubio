const { Book, Library } = require('../src/2-library');

describe('Problem 2: Composition - Library and Book', () => {

  describe('Book class', () => {
    test('Book constructor sets title, author, and isbn', () => {
      const book = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
      expect(book.title).toBe("The Great Gatsby");
      expect(book.author).toBe("F. Scott Fitzgerald");
      expect(book.isbn).toBe("978-0743273565");
    });

    test('Book isAvailable defaults to true', () => {
      const book = new Book("1984", "George Orwell", "978-0451524935");
      expect(book.isAvailable).toBe(true);
    });

    test('Book isAvailable can be changed', () => {
      const book = new Book("1984", "George Orwell", "978-0451524935");
      book.isAvailable = false;
      expect(book.isAvailable).toBe(false);
    });
  });

  describe('Library class', () => {
    let library;
    let book1, book2, book3;

    beforeEach(() => {
      library = new Library("City Library");
      book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
      book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");
      book3 = new Book("1984", "George Orwell", "978-0451524935");
    });

    test('Library constructor sets name', () => {
      expect(library.name).toBe("City Library");
    });

    test('Library starts with empty books and checkedOut arrays', () => {
      const books = library.getBooks ? library.getBooks() : library.books;
      const checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;
      expect(books).toEqual([]);
      expect(checkedOut).toEqual([]);
    });

    describe('addBook()', () => {
      test('addBook() adds a book to the library', () => {
        library.addBook(book1);
        const books = library.getBooks ? library.getBooks() : library.books;
        expect(books).toContain(book1);
        expect(books.length).toBe(1);
      });

      test('addBook() can add multiple books', () => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
        const books = library.getBooks ? library.getBooks() : library.books;
        expect(books.length).toBe(3);
        expect(books).toContain(book1);
        expect(books).toContain(book2);
        expect(books).toContain(book3);
      });
    });

    describe('checkoutBook()', () => {
      beforeEach(() => {
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);
      });

      test('checkoutBook() moves book from books to checkedOut', () => {
        const result = library.checkoutBook("The Great Gatsby");
        expect(result).toBe(true);

        const books = library.getBooks ? library.getBooks() : library.books;
        const checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;

        expect(checkedOut).toContain(book1);
        expect(books).not.toContain(book1);
      });

      test('checkoutBook() sets isAvailable to false', () => {
        library.checkoutBook("The Great Gatsby");
        expect(book1.isAvailable).toBe(false);
      });

      test('checkoutBook() returns false if book not in library', () => {
        const result = library.checkoutBook("Unknown Book");
        expect(result).toBe(false);
      });

      test('checkoutBook() returns false if book already checked out', () => {
        library.checkoutBook("The Great Gatsby");
        const result = library.checkoutBook("The Great Gatsby");
        expect(result).toBe(false);
      });

      test('checkoutBook() can checkout multiple books', () => {
        library.checkoutBook("The Great Gatsby");
        library.checkoutBook("1984");

        const checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;
        expect(checkedOut.length).toBe(2);
        expect(checkedOut).toContain(book1);
        expect(checkedOut).toContain(book3);
      });
    });

    describe('returnBook()', () => {
      beforeEach(() => {
        library.addBook(book1);
        library.addBook(book2);
        library.checkoutBook("The Great Gatsby");
        library.checkoutBook("To Kill a Mockingbird");
      });

      test('returnBook() moves book from checkedOut to books', () => {
        const result = library.returnBook("The Great Gatsby");
        expect(result).toBe(true);

        const books = library.getBooks ? library.getBooks() : library.books;
        const checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;

        expect(books).toContain(book1);
        expect(checkedOut).not.toContain(book1);
      });

      test('returnBook() sets isAvailable to true', () => {
        expect(book1.isAvailable).toBe(false);
        library.returnBook("The Great Gatsby");
        expect(book1.isAvailable).toBe(true);
      });

      test('returnBook() returns false if book not checked out', () => {
        const result = library.returnBook("Unknown Book");
        expect(result).toBe(false);
      });

      test('returnBook() returns false if book is already in library', () => {
        library.returnBook("The Great Gatsby");
        const result = library.returnBook("The Great Gatsby");
        expect(result).toBe(false);
      });
    });

    describe('getBooks() and getCheckedOut()', () => {
      test('getBooks() returns the books array', () => {
        library.addBook(book1);

        const books = library.getBooks ? library.getBooks() : library.books;
        expect(books).toContain(book1);
      });

      test('getCheckedOut() returns the checkedOut array', () => {
        library.addBook(book1);
        library.checkoutBook("The Great Gatsby");

        const checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;
        expect(checkedOut).toContain(book1);
      });
    });

    describe('Integration: Full library workflow', () => {
      test('Complete workflow: add books, checkout, return', () => {
        // Add all books
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);

        let books = library.getBooks ? library.getBooks() : library.books;
        expect(books.length).toBe(3);

        // Checkout some books
        library.checkoutBook("The Great Gatsby");
        library.checkoutBook("1984");

        books = library.getBooks ? library.getBooks() : library.books;
        let checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;
        expect(books.length).toBe(1);
        expect(checkedOut.length).toBe(2);
        expect(book1.isAvailable).toBe(false);
        expect(book3.isAvailable).toBe(false);

        // Return one book
        library.returnBook("The Great Gatsby");

        books = library.getBooks ? library.getBooks() : library.books;
        checkedOut = library.getCheckedOut ? library.getCheckedOut() : library.checkedOut;
        expect(books.length).toBe(2);
        expect(checkedOut.length).toBe(1);
        expect(book1.isAvailable).toBe(true);
      });
    });
  });
});
