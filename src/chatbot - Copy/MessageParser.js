class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello") || lowercase.includes("hi")) {
      this.actionProvider.greet();
    }

    if (lowercase.includes("thank")) {
      this.actionProvider.welcome();
    }

    if (lowercase.includes("bye") || lowercase.includes("leave me")) {
      this.actionProvider.bye();
    }

    if (lowercase.includes("device")) {
      this.actionProvider.handleDeviceInfo();
    }
  }
}

export default MessageParser;
