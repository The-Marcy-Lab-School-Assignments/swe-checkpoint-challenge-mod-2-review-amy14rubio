# SWE Checkpoint Challenge — Mod 2 Review

- [Overview](#overview)
- [Setup](#setup)
- [Short Response](#short-response)
- [Problem 1: Inheritance and Polymorphism - Notification System](#problem-1-inheritance-and-polymorphism---notification-system)
  - [Part 1: Notification class (parent)](#part-1-notification-class-parent)
  - [Part 2: EmailNotification class (child)](#part-2-emailnotification-class-child)
  - [Part 3: PushNotification class (child)](#part-3-pushnotification-class-child)
  - [Demonstrating Polymorphism](#demonstrating-polymorphism)
- [Problem 2: Composition - Library and Book](#problem-2-composition---library-and-book)
  - [Book class](#book-class)
  - [Library class](#library-class)

## Overview

In this assignment, you will practice implementing classes in JavaScript. There are two coding problems and three short response questions.

**Coding Problems:**
1. **Problem 1** demonstrates **inheritance** and **polymorphism** — a `Notification` parent class with two child classes (`EmailNotification`, `PushNotification`) that each override the `send()` method.
2. **Problem 2** demonstrates **composition** — a `Library` class that *contains* `Book` objects.

We've provided example usage that you can use to manually test your code. Do this first.

Then, run `npm test` to verify your implementations before submitting.

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

Here are some useful commands to remember.

```sh
git checkout -b draft   # switch to the draft branch before starting

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

When you are finished, create a pull request and tag your instructor for review.

---

## Short Response

Short response questions can be found in the `src/short-response.md` file. Write your responses directly in that file! Do not forget to complete this part of the assignment.

---

## Problem 1: Inheritance and Polymorphism - Notification System

**Instructions:** In the `src/1-notification.js` file, demonstrate **inheritance** and **polymorphism** by creating a `Notification` parent class and two child classes: `EmailNotification` and `PushNotification`.

Each child class will override the `send()` method to return a different message — this is **polymorphism** in action!

### Part 1: Notification class (parent)

Create a `Notification` class with the following:

- **Instance Properties:**
  - `recipient` (String, public, set by the constructor)
  - `message` (String, public, set by the constructor)
  - `timestamp` (Date, public, set by the constructor to `new Date()`)
- **Instance Methods:**
  - `send()` - returns `"Sending notification to {recipient}: {message}"`
  - `getFormattedTimestamp()` - returns the timestamp formatted as `"MM/DD/YYYY"` (e.g., `new Date('2024-03-15')` becomes `"03/15/2024"`)

Test your `Notification` class with the following example usage:

```js
const notification = new Notification("user@example.com", "Hello!");
console.log(notification.recipient); // "user@example.com"
console.log(notification.message); // "Hello!"
console.log(notification.timestamp); // Date object
console.log(notification.send()); // "Sending notification to user@example.com: Hello!"
console.log(notification.getFormattedTimestamp()); // "03/15/2024" (depends on current date)
```

### Part 2: EmailNotification class (child)

Create an `EmailNotification` class that extends `Notification` with the following:

- **Additional Instance Properties:**
  - `subject` (String, public, set by the constructor)
- **Overridden Methods:**
  - `send()` - returns `"Sending email to {recipient} with subject '{subject}': {message}"`

Test your `EmailNotification` class with the following example usage:

```js
const email = new EmailNotification("user@example.com", "Your order has shipped!", "Order Update");
console.log(email);
// EmailNotification { recipient: "user@example.com", message: "Your order has shipped!", timestamp: Date, subject: "Order Update" }
console.log(email.send()); // "Sending email to user@example.com with subject 'Order Update': Your order has shipped!"
console.log(email.getFormattedTimestamp()); // Uses inherited method
```

### Part 3: PushNotification class (child)

Create a `PushNotification` class that extends `Notification` with the following:

- **Additional Instance Properties:**
  - `appName` (String, public, set by the constructor)
  - `badge` (Number, public, set by the constructor - represents notification count)
- **Overridden Methods:**
  - `send()` - returns `"Sending push from {appName} to {recipient}: {message} (Badge: {badge})"`

Test your `PushNotification` class with the following example usage:

```js
const push = new PushNotification("device_token_123", "You have a new message!", "ChatApp", 5);
console.log(push);
// PushNotification { recipient: "device_token_123", message: "You have a new message!", timestamp: Date, appName: "ChatApp", badge: 5 }
console.log(push.send()); 
// "Sending push from ChatApp to device_token_123: You have a new message! (Badge: 5)"
```

### Demonstrating Polymorphism

Once all classes are implemented, inside the provided `test()` function, test polymorphism by creating an array of different notification types and calling `send()` on each:

```js
const test = () => {
  const email = new EmailNotification("user@example.com", "Welcome to our platform!", "Welcome");
  const push = new PushNotification("device_token", "New message received", "ChatApp", 3);

  const notifications = [email, push];

  // Polymorphism: same method call, different behavior
  notifications.forEach(notification => {
    console.log(notification.send());
  });
}
/*
Output:
"Sending email to user@example.com with subject 'Welcome': Welcome to our platform!"
"Sending push from ChatApp to device_token: New message received (Badge: 3)"
*/
```

## Problem 2: Composition - Library and Book

**Instructions:** In the `src/2-library.js` file, create a `Book` class and a `Library` class that demonstrates **composition** (a library *has* books).

### Book class

Create a `Book` class with the following:

- **Instance Properties:**
  - `title` (String, public, set by the constructor)
  - `author` (String, public, set by the constructor)
  - `isbn` (String, public, set by the constructor)
  - `isAvailable` (Boolean, public, default value of `true`)

Test your `Book` class with the following example usage:

```js
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");
const book3 = new Book("1984", "George Orwell", "978-0451524935");

console.log(book1); 
// Book { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", isAvailable: true }
console.log(book2.isAvailable); // true
```

### Library class

Create a `Library` class with the following:

- **Instance Properties:**
  - `name` (String, public, set by the constructor)
  - `books` (Array of `Book` objects, *private*, starting value of `[]`)
  - `checkedOut` (Array of `Book` objects, *private*, starting value of `[]`)
- **Instance Methods:**
  - `getBooks()` - returns the `books` array (or use `get` syntax)
  - `getCheckedOut()` - returns the `checkedOut` array (or use `get` syntax)
  - `addBook(book)` - adds a `Book` object to the `books` array
  - `checkoutBook(title)` - moves the first `Book` with a matching title from the `books` array to the `checkedOut` array and sets the book's `isAvailable` to `false`. Returns `true` if successful, `false` otherwise.
  - `returnBook(title)` - moves the first `Book` with a matching title from the `checkedOut` array back to the `books` array and sets the book's `isAvailable` to `true`. Returns `true` if successful, `false` otherwise.

Test your `Library` class with the following example usage:

```js
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");
const book3 = new Book("1984", "George Orwell", "978-0451524935");

const library = new Library("City Library");
console.log(library); // Library { name: "City Library" }

// 1. Adding books to the library
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

console.log(library.getBooks());
// OR if you use the get syntax:
console.log(library.books);
/*
[
  Book { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", isAvailable: true },
  Book { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", isAvailable: true },
  Book { title: "1984", author: "George Orwell", isbn: "978-0451524935", isAvailable: true }
]
*/

// 2. Checking out a book
console.log(library.checkoutBook("The Great Gatsby")); // true
console.log(library.checkoutBook("Unknown Book")); // false (not in library)

console.log(book1.isAvailable); // false
console.log(library.getBooks().length); // 2
console.log(library.getCheckedOut().length); // 1

// 3. Returning a book
console.log(library.returnBook("The Great Gatsby")); // true
console.log(book1.isAvailable); // true
console.log(library.getBooks().length); // 3
console.log(library.getCheckedOut().length); // 0
```
