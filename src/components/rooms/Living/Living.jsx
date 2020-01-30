import React, { Component } from "react";

import LivingView from "./LivingView";
import LivingForm from "./LivingForm";

class Living extends Component {
  state = {};
  render() {
    return (
      <div>
        <LivingView />
        <br></br>
        <br></br>
        <LivingForm />
      </div>
    );
  }
}

export default Living;
