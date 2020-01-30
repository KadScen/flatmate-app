import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

class EntranceView extends Component {
  state = {
    entranceFloor: "",
    entranceDust: ""
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("Entrance")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          entranceFloor: data.isUrgent
        });
      });

    db.collection("Entrance")
      .doc("Dust")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          entranceDust: data.isUrgent
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
              {this.state.entranceFloor}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.entranceFloor * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Dust
            <span className="badge badge-primary badge-pill">
              {this.state.entranceDust}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.entranceDust * 100) / 3 + "%" }}
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

export default EntranceView;
