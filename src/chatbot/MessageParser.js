class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
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

    if (lowercase.includes("what", "sensor")) {
      this.actionProvider.handleWhatIsSensorInfo();
    }

    if (lowercase.includes("where", "sensor")) {
      this.actionProvider.handleWhereSensorInfo();
    }

    if (lowercase.includes("actor")) {
      this.actionProvider.handleActorInfo();
    }

    if (lowercase.includes("automation")) {
      this.actionProvider.handleAutomationInfo();
    }
  }
}

export default MessageParser;
