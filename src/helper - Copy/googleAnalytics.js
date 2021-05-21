function InitializeReactGA(ReactGA) {
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize('G-LM4H5B69Y3');
    window.GA_INITIALIZED = true;
  }
}

export default InitializeReactGA;