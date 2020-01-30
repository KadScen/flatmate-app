import React, { Component } from "react";

import WashroomView from "./WashroomView";
import WashroomForm from "./WashroomForm";

class Washroom extends Component {
  state = {};
  render() {
    return (
      <div>
        <WashroomView />
        <br></br>
        <br></br>
        <WashroomForm />
      </div>
    );
  }
}

export default Washroom;
