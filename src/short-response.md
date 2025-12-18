# Short Response

## Question 1

For each scenario, identify whether the relationship is **inheritance** or **composition**, and provide a brief explanation.

For example, a `Notification` and an `EmailNotification` have an inheritance relationship because "an email notification is a type of notification". Meanwhile a library and a book have a composition relationship because "a library has many books".

1. A `House` class and a `Room` class
2. A `Bicycle` class and a `Vehicle` class
3. A `School` class and a `Teacher` class
4. A `Penguin` class and a `Bird` class
5. A `Order` class and an `OrderItem` class
6. A `CheckingAccount` class and a `BankAccount` class

### Response 1

1. Composition
2. Inheritance
3. Composition
4. Inheritance
5. Composition
6. Inheritance

---

## Question 2

When designing a class, you must decide which properties should be **public** and which should be **private**.

a) What is the purpose of making a property private?

b) In the `Library` class from Problem 2, the `books` and `checkedOut` arrays are private while the `name` property is public. Explain why this design choice makes sense. What could go wrong if `books` and `checkedOut` were public?

### Response 2

a) The purpose of making a property private is that it ensures that the developer doesn't **accidentally mutate** the private property and **break the system**. Private properties are used to enforce **encapsulation**, enforce **invariants** and overall to **reduce bugs**.

b) This design choice makes sense because the `name` property **is not mutated** throughout the `Library` class while the `books` and `checkedOut` properties are mutated and therefore need **protection through the encapsulation of private properties**.

---

## Question 3

The following `BankAccount` class does **NOT** demonstrate good encapsulation. Review the code and answer the questions below.

```js
class BankAccount {
  constructor(ownerName, initialBalance) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({ type: 'deposit', amount });
  }

  withdraw(amount) {
    this.balance -= amount;
    this.transactions.push({ type: 'withdrawal', amount });
  }
}

// Example usage that demonstrates the problem:
const account = new BankAccount("Alice", 1000);
account.balance = 1000000;  // Uh oh! Anyone can modify the balance directly
account.transactions = [];   // Uh oh! Transaction history can be erased
```

a) Identify which properties should be made private and explain why.

b) Rewrite the `BankAccount` class with proper encapsulation. Include:
   - Private properties where appropriate
   - Getter methods to access private data
   - Any necessary modifications to existing methods

c) Explain why the `withdraw` method in the original code has a logic flaw, and fix it in your rewritten class.

### Response 3

a) The `balance` and `transactions` properties should be made private. This is because these properties are **mutated** throughout the `deposit` and `withdraw` methods and **should not be easily accessed** outside of the `BankAccount` class. These properties need protection to **prevent outside interference** as shown with: `account.balance = 1000000` and `account.transactions = []`.

b) 

```js
class BankAccount {
  #balance
  #transactions = []
  constructor(ownerName, initialBalance) {
    this.ownerName = ownerName;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    this.#transactions.push({ type: 'deposit', amount });
  }

  withdraw(amount) {
    if (this.#balance - amount <= 0){
      console.log(`Error ${amount} cannot be withdrawn`)
      return
    }
    this.#balance -= amount;
    this.#transactions.push({ type: 'withdrawal', amount });
  }
}
```

c) The flaw in the `withdraw` method is that the user can **withdraw an amount that they do not have in their balance**. In other words, there is **no limit** to the amount the user can withdraw.