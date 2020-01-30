import React, { Component } from "react";

import KitchenView from "./KitchenView";
import KitchenForm from "./KitchenForm";

class Kitchen extends Component {
  state = {};
  render() {
    return (
      <div>
        <KitchenView />
        <br></br>
        <br></br>
        <KitchenForm />
      </div>
    );
  }
}

export default Kitchen;
