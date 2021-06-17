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

  handleSensorInfo = () => {
      const message = this.createChatBotMessage(
        "A sensor is a component that produces data. It acts like a publisher of the Pub/Sub service.",
      );

      this.addMessageToState(message);
    };

  handleWhatIsSensorInfo = () => {
       const message = this.createChatBotMessage(
         "A sensor is a component that produces data. It acts like a publisher of the Pub/Sub service.",
       );

       this.addMessageToState(message);
  };

  handleWhereSensorInfo = () => {
       const message2 = this.createChatBotMessage(
                "You can see your list of sensors and configure them in the <Sensors> section.",
              );

              this.addMessageToState(message2);
     };

  handleActorInfo = () => {
       const message = this.createChatBotMessage(
         "An actor is a component that consumes data. It acts like a subscriber of the Pub/Sub service.",
       );

       this.addMessageToState(message);
     };
  handleAutomationInfo = () => {
       const message = this.createChatBotMessage(
         "To access the automation service: click Menu, then Automation",
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
