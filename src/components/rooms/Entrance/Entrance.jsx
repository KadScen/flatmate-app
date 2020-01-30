import React, { Component } from "react";

import EntranceView from "./EntranceView";
import EntranceForm from "./EntranceForm";

class Entrance extends Component {
  state = {};
  render() {
    return (
      <div>
        <EntranceView />
        <br></br>
        <br></br>
        <EntranceForm />
      </div>
    );
  }
}

export default Entrance;
