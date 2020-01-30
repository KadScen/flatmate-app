import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

class TerraceView extends Component {
  state = {
    terraceFloor: "",
    terraceTable: ""
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("Terrace")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          terraceFloor: data.isUrgent
        });
      });

    db.collection("Terrace")
      .doc("Table")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          terraceTable: data.isUrgent
        });
      });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Floor
            <span className="badge badge-primary badge-pill">
              {this.state.terraceFloor}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.terraceFloor * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Table
            <span className="badge badge-primary badge-pill">
              {this.state.terraceTable}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.terraceTable * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </ul>
      </div>
    );
  }
}

export default TerraceView;
