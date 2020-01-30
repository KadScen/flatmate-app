import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

import "../../../css/KitchenView.css";

class KitchenView extends Component {
  state = {
    kitchenFloor: "",
    kitchenSurface: "",
    KitchenMicOven: "",
    kitchenDust: "",
    kitchenTrash: ""
  };

  componentDidMount() {
    const db = firebase.firestore();

    db.collection("Kitchen")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          kitchenFloor: data.isUrgent
        });
      });

    db.collection("Kitchen")
      .doc("Surfaces")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          kitchenSurface: data.isUrgent
        });
      });

    db.collection("Kitchen")
      .doc("Microwave-Oven")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          KitchenMicOven: data.isUrgent
        });
      });

    db.collection("Kitchen")
      .doc("Dust")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          kitchenDust: data.isUrgent
        });
      });

    db.collection("Kitchen")
      .doc("Trash")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          kitchenTrash: data.isUrgent
        });
      });
  }

  render() {
    return (
      <div>
        <p>Here is the list of the tasks needed to be done in the kitchen</p>

        {/* Test of new front presentation */}
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Floor
            <span className="badge badge-primary badge-pill">
              {this.state.kitchenFloor}
            </span>
          </li>
          <div className="progress white">
            {/* The variable in the style calcul the state of the room in percentage */}
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.kitchenFloor * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Surfaces
            <span className="badge badge-primary badge-pill">
              {this.state.kitchenSurface}
            </span>
          </li>
          <div className="progress white">
            {/* The variable in the style calcul the state of the room in percentage */}
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.kitchenSurface * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Microwave/Oven
            <span className="badge badge-primary badge-pill">
              {this.state.KitchenMicOven}
            </span>
          </li>
          <div className="progress white">
            {/* The variable in the style calcul the state of the room in percentage */}
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.KitchenMicOven * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Dust
            <span className="badge badge-primary badge-pill">
              {this.state.kitchenDust}
            </span>
          </li>
          <div className="progress white">
            {/* The variable in the style calcul the state of the room in percentage */}
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.kitchenDust * 100) / 3 + "%" }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <li className="list-group-item d-flex justify-content-between align-items-center">
            Trash
            <span className="badge badge-primary badge-pill">
              {this.state.kitchenTrash}
            </span>
          </li>
          <div className="progress white">
            {/* The variable in the style calcul the state of the room in percentage */}
            <div
              className="progress-bar blue"
              role="progressbar"
              style={{ width: (this.state.kitchenTrash * 100) / 3 + "%" }}
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

export default KitchenView;
