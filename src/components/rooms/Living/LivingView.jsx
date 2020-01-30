import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

class LivingView extends Component {
  state = {
    livingFloor: "",
    livingDust: ""
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("Living")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          livingFloor: data.isUrgent
        });
      });

    db.collection("Living")
      .doc("Dust")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          livingDust: data.isUrgent
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
              {this.state.livingFloor}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.livingFloor * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Dust
            <span className="badge badge-primary badge-pill">
              {this.state.livingDust}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.livingDust * 100) / 3 + "%" }}
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

export default LivingView;
