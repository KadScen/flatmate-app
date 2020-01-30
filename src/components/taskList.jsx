import React, { Component } from "react";
import firebase from "../config/fbConfig";

import "../css/taskList.css";

class TaskList extends Component {
  state = {
    // Initialise the state of the rooms

    kitchenFloor: 0,
    kitchenSurface: 0,
    KitchenMicOven: 0,
    kitchenDust: 0,
    kitchenTrash: 0,

    livingDust: 0,
    livingFloor: 0,

    washroomBath: 0,
    washroomFloor: 0,
    washroomSinkMirror: 0,
    washroomToilet: 0,

    entranceDust: 0,
    entranceFloor: 0,

    terraceFloor: 0,
    terraceTable: 0
  };

  componentDidMount() {
    // Connect to DB and fetch the the state of the room (data.isUrgent)
    const db = firebase.firestore();

    // Retrieve data from Kitchen
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

    // Retrieve data from Living
    db.collection("Living")
      .doc("Dust")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          livingDust: data.isUrgent
        });
      });

    db.collection("Living")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          livingFloor: data.isUrgent
        });
      });

    // Retrieve data from Washroom
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
      .doc("Toilet")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          washroomToilet: data.isUrgent
        });
      });

    // Retrieve data from Entrance
    db.collection("Entrance")
      .doc("Dust")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          entranceDust: data.isUrgent
        });
      });

    db.collection("Entrance")
      .doc("Floor")
      .get()
      .then(doc => {
        const data = doc.data();
        this.setState({
          entranceFloor: data.isUrgent
        });
      });

    // Retrieve data from Terrace
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
    const isKitchenUrgent =
      ((this.state.kitchenSurface +
        this.state.kitchenTrash +
        this.state.KitchenMicOven +
        this.state.kitchenDust +
        this.state.kitchenFloor) *
        100) /
      15;

    const kitchenTasks =
      this.state.kitchenSurface +
      this.state.kitchenTrash +
      this.state.KitchenMicOven +
      this.state.kitchenDust +
      this.state.kitchenFloor;

    const isLivingUrgent =
      ((this.state.livingDust + this.state.livingFloor) * 100) / 6;

    const isWashroomUrgent =
      ((this.state.washroomBath +
        this.state.washroomFloor +
        this.state.washroomSinkMirror +
        this.state.washroomToilet) *
        100) /
      12;

    const isEntranceUrgent =
      ((this.state.entranceDust + this.state.entranceFloor) * 100) / 6;

    const isTerraceUrgent =
      ((this.state.terraceFloor + this.state.terraceTable) * 100) / 6;


    return (
      <div className="container">
        <ul className="list-group">
          <a href="/kitchen">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Kitchen
              <span className="badge badge-primary badge-pill">
                {kitchenTasks}
              </span>
            </li>
            <div className="progress white">
              {/* The variable in the style calcul the state of the room in percentage */}
              <div
                className="determinate blue"
                role="progressbar"
                style={{ width: isKitchenUrgent + "%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </a>
          <a href="/living">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Living
              <span className="badge badge-primary badge-pill">
                {this.state.isLivingUrgent}
              </span>
            </li>
            <div className="progress white">
              {/* The variable in the style calcul the state of the room in percentage */}
              <div
                className="determinate blue"
                role="progressbar"
                style={{ width: isLivingUrgent + "%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </a>
          <a href="/washroom">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Washroom
              <span className="badge badge-primary badge-pill">
                {this.state.isWashroomUrgent}
              </span>
            </li>
            <div className="progress white">
              {/* The variable in the style calcul the state of the room in percentage */}
              <div
                className="determinate blue"
                role="progressbar"
                style={{ width: isWashroomUrgent + "%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </a>

          <a href="/entrance">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Entrance
              <span className="badge badge-primary badge-pill">
                {this.state.isEntranceUrgent}
              </span>
            </li>
            <div className="progress white">
              {/* The variable in the style calcul the state of the room in percentage */}
              <div
                className="determinate blue"
                role="progressbar"
                style={{ width: isEntranceUrgent + "%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </a>

          <a href="/terrace">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Terrace
              <span className="badge badge-primary badge-pill">
                {this.state.isTerraceUrgent}
              </span>
            </li>
            <div className="progress white">
              {/* The variable in the style calcul the state of the room in percentage */}
              <div
                className="determinate blue"
                role="progressbar"
                style={{ width: isTerraceUrgent + "%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </a>
        </ul>
      </div>
    );
  }
}

export default TaskList;
