const { Notification, EmailNotification, PushNotification } = require('../src/1-notification');

describe('Problem 1: Inheritance and Polymorphism - Notification System', () => {

  describe('Part 1: Notification class', () => {
    test('Notification constructor sets recipient and message', () => {
      const notification = new Notification("user@example.com", "Hello!");
      expect(notification.recipient).toBe("user@example.com");
      expect(notification.message).toBe("Hello!");
    });

    test('Notification constructor sets timestamp to a Date object', () => {
      const notification = new Notification("user@example.com", "Hello!");
      expect(notification.timestamp).toBeInstanceOf(Date);
    });

    test('Notification send() returns correct string', () => {
      const notification = new Notification("user@example.com", "Hello!");
      expect(notification.send()).toBe("Sending notification to user@example.com: Hello!");
    });

    test('Notification getFormattedTimestamp() formats date as MM/DD/YYYY', () => {
      const notification = new Notification("user@example.com", "Hello!");
      // Override timestamp for predictable testing
      notification.timestamp = new Date('2024-03-15');
      expect(notification.getFormattedTimestamp()).toBe("03/15/2024");

      notification.timestamp = new Date('2024-12-01');
      expect(notification.getFormattedTimestamp()).toBe("12/01/2024");

      notification.timestamp = new Date('2024-01-09');
      expect(notification.getFormattedTimestamp()).toBe("01/09/2024");
    });
  });

  describe('Part 2: EmailNotification class', () => {
    test('EmailNotification extends Notification', () => {
      const email = new EmailNotification("user@example.com", "Welcome!", "Hello");
      expect(email instanceof Notification).toBe(true);
    });

    test('EmailNotification constructor sets recipient, message, and subject', () => {
      const email = new EmailNotification("user@example.com", "Your order has shipped!", "Order Update");
      expect(email.recipient).toBe("user@example.com");
      expect(email.message).toBe("Your order has shipped!");
      expect(email.subject).toBe("Order Update");
    });

    test('EmailNotification send() returns overridden string with subject', () => {
      const email = new EmailNotification("user@example.com", "Your order has shipped!", "Order Update");
      expect(email.send()).toBe("Sending email to user@example.com with subject 'Order Update': Your order has shipped!");
    });

    test('EmailNotification inherits getFormattedTimestamp() from Notification', () => {
      const email = new EmailNotification("user@example.com", "Welcome!", "Hello");
      email.timestamp = new Date('2024-07-04');
      expect(email.getFormattedTimestamp()).toBe("07/04/2024");
    });
  });

  describe('Part 3: PushNotification class', () => {
    test('PushNotification extends Notification', () => {
      const push = new PushNotification("device_token", "New message!", "ChatApp", 5);
      expect(push instanceof Notification).toBe(true);
    });

    test('PushNotification constructor sets recipient, message, appName, and badge', () => {
      const push = new PushNotification("device_token_123", "You have a new message!", "ChatApp", 5);
      expect(push.recipient).toBe("device_token_123");
      expect(push.message).toBe("You have a new message!");
      expect(push.appName).toBe("ChatApp");
      expect(push.badge).toBe(5);
    });

    test('PushNotification send() returns overridden string with appName and badge', () => {
      const push = new PushNotification("device_token_123", "You have a new message!", "ChatApp", 5);
      expect(push.send()).toBe("Sending push from ChatApp to device_token_123: You have a new message! (Badge: 5)");
    });

    test('PushNotification inherits getFormattedTimestamp() from Notification', () => {
      const push = new PushNotification("device_token", "New message!", "ChatApp", 5);
      push.timestamp = new Date('2024-02-29');
      expect(push.getFormattedTimestamp()).toBe("02/29/2024");
    });
  });

  describe('Polymorphism', () => {
    test('Different notification types return different send() messages', () => {
      const email = new EmailNotification("user@example.com", "Welcome to our platform!", "Welcome");
      const push = new PushNotification("device_token", "New message received", "ChatApp", 3);

      const notifications = [email, push];
      const sendMessages = notifications.map(notification => notification.send());

      expect(sendMessages).toEqual([
        "Sending email to user@example.com with subject 'Welcome': Welcome to our platform!",
        "Sending push from ChatApp to device_token: New message received (Badge: 3)"
      ]);
    });

    test('All notification types are instances of Notification', () => {
      const email = new EmailNotification("test@test.com", "Test", "Test");
      const push = new PushNotification("token", "Test", "App", 1);

      expect(email instanceof Notification).toBe(true);
      expect(push instanceof Notification).toBe(true);
    });
  });
});
