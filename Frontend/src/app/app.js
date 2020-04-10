import React from "react";
import CustomContainer from "../app/container";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <CustomContainer />
      </BrowserRouter>
    );
  }
}

export default App;
