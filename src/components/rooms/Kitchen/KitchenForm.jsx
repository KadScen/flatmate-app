import React, { Component } from "react";
import firebase from "../../../config/fbConfig";

class KitchenForm extends Component {
  state = {
    whichPart: "",
    isUrgent: 5
  };

  handleForm = event => {
    const db = firebase.firestore();
    db.settings({});
    db.collection("Kitchen")
      .doc(this.state.whichPart)
      .set({
        isUrgent: this.state.isUrgent
      })
      .then(function () {
        console.log("Document successfully written!");
        window.location.reload();
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    // console.log('The choosen room is: ' + this.state.whichRoom);
    // console.log('The importance is: ' + this.state.isUrgent);
    // console.log('Details: ' + this.state.message);
    event.preventDefault();
  };

  // Find the way to handle these three event in one
  handleChange = event => {
    this.setState({ whichPart: event.target.value });
  };
  handleChange1 = event => {
    this.setState({ isUrgent: Number(event.target.value) });
  };
  handleChange2 = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleForm}>
          <div className="form-group">
            <label htmlFor="whichPartOfTheKitchen">
              Which part of the Kitchen needs to be cleaned?
            </label>
            <select
              value={this.state.whichPart}
              onChange={this.handleChange}
              className="form-control"
              id="whichPartOfTheKitchen"
            >
              <option></option>
              <option>Floor</option>
              <option>Surfaces</option>
              <option>Microwave-Oven</option>
              <option>Dust</option>
              <option>Trash</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="isItUrgent">How dirty is it?</label>
            <select
              value={this.state.isUrgent}
              onChange={this.handleChange1}
              className="form-control"
              id="isItUrgent"
            >
              <option value="5"></option>
              <option type="number" value="0">
                Sparkling!!
              </option>
              <option type="number" value="1">
                It's ok
              </option>
              <option type="number" value="2">
                It have to be cleaned
              </option>
              <option type="number" value="3">
                It is critical
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Anything to add?</label>
            <textarea
              value={this.state.message}
              onChange={this.handleChange2}
              className="form-control"
              id="message"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={!this.state.whichPart}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default KitchenForm;
