class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend!");
    this.addMessageToState(message);
  };

  bye = () => {
      const message = this.createChatBotMessage("Bye, friend!");
      this.addMessageToState(message);
    };

  welcome = () => {
      const message = this.createChatBotMessage("You're welcome!");
      this.addMessageToState(message);
   };

  handleDeviceInfo = () => {
    const message = this.createChatBotMessage(
      "Here are your informations:",
      {
        widget: "deviceInfo",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
