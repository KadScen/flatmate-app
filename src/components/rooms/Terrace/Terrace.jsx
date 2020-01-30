import React, { Component } from "react";

import TerraceView from "./TerraceView";
import TerraceForm from "./TerraceForm";

class Terrace extends Component {
  state = {};
  render() {
    return (
      <div>
        <TerraceView />
        <br></br>
        <br></br>
        <TerraceForm />
      </div>
    );
  }
}

export default Terrace;
