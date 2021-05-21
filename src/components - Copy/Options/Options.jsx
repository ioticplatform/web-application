import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Add New Device",
      handler: props.actionProvider.handleDeviceInfo,
      id: 1,
    },
    {
      text: "Configure Device",
      handler: () => {},
      id: 2
    },
    {
      text: "Configure Sensor",
      handler: () => {},
      id: 3
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
