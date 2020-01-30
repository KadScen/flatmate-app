import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

class WashroomView extends Component {
  state = {
    washroomFloor: "",
    washroomSinkMirror: "",
    washroomBath: "",
    washroomToilet: ""
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("Washroom")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          washroomFloor: data.isUrgent
        });
      });

    db.collection("Washroom")
      .doc("Sink&Mirror")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          washroomSinkMirror: data.isUrgent
        });
      });

    db.collection("Washroom")
      .doc("Bath")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          washroomBath: data.isUrgent
        });
      });

    db.collection("Washroom")
      .doc("Toilet")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          washroomToilet: data.isUrgent
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
              {this.state.washroomFloor}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.washroomFloor * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Sink & Mirror
            <span className="badge badge-primary badge-pill">
              {this.state.washroomSinkMirror}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.washroomSinkMirror * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Bath
            <span className="badge badge-primary badge-pill">
              {this.state.washroomBath}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.washroomBath * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Toilet
            <span className="badge badge-primary badge-pill">
              {this.state.washroomToilet}
            </span>
          </li>
          <div className="progress white">
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.washroomToilet * 100) / 3 + "%" }}
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

export default WashroomView;
