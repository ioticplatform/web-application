import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";

const config = {
  botName: "IoTICBot",
  initialMessages: [
    createChatBotMessage(`Hello! How can I help you?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "deviceInfo",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "How can get a device?",
            answer:
                "You can make it yourself or you can buy one from us. See the Buy Devices section from the menu.",
            id: 1,
          },
          {
            question: "How do I connect a device?",
            answer:
                "First, you have to install the mobile app IoTIC from Play Store. Then, make sure that your device and" +
                " your phone are connected to Wi-Fi...",
            id: 2,
          },
          {
            question: "How do I configure a device?",
            answer:
                "Click Devices -> click on the device to be configured -> Edit",
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;
