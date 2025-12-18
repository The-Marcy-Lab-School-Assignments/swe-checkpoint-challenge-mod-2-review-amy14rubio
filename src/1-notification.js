// Problem 1: Inheritance and Polymorphism - Notification System
// Implement your Notification, EmailNotification, and PushNotification classes below

class Notification {
  constructor(recipient, message, timestamp = new Date()) {
    this.recipient = recipient;
    this.message = message;
    this.timestamp = timestamp;
  }

  send() {
    return `Sending notification to ${this.recipient}: ${this.message}`;
  }

  getFormattedTimestamp() {
    const month = String(this.timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(this.timestamp.getDate()).padStart(2, '0');
    const year = String(this.timestamp.getFullYear()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  }
}

class EmailNotification extends Notification {
  constructor(recipient, message, subject) {
    super(recipient, message, new Date());
    this.subject = subject;
  }
  send() {
    return `Sending email to ${this.recipient} with subject '${this.subject}': ${this.message}`;
  }
}

class PushNotification extends Notification {
  constructor(recipient, message, appName, badge) {
    super(recipient, message, new Date());
    this.appName = appName;
    this.badge = badge;
  }
  send() {
    return `Sending push from ${this.appName} to ${this.recipient}: ${this.message} (Badge: ${this.badge})`;
  }
}

const test = () => {
  const email = new EmailNotification('user@example.com', 'Welcome to our platform!', 'Welcome');
  const push = new PushNotification('device_token', 'New message received', 'ChatApp', 3);

  const notifications = [email, push];

  // Polymorphism: same method call, different behavior
  notifications.forEach((notification) => {
    console.log(notification.send());
  });
};

// test()

module.exports = { Notification, EmailNotification, PushNotification };
