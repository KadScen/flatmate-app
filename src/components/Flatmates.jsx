import React, { Component } from 'react';
import "../scripts/index";

import firebase from 'firebase/app';
import 'firebase/auth';

class Flatmates extends Component {
  state = {
    greeting: "",
    score: "",
    userLogged: "",
    answersForm: [],
    whatCleaned: ""
  };

  componentDidMount() {
    // Was supposed to be in a sep file in /config/fbConfig.js
    // Make auth and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Listen for auth status changes
    auth.onAuthStateChanged(user => {
      if (user) {
        // Get data
        db.collection("users").doc(user.uid).get().then(doc => {
          const data = doc.data();
          this.setState({
            greeting: "Hello " + data.name + "!",
            score: "You have " + data.score + " points",
            userLogged: "block"
          });
        });
      } else {
        this.setState({
          greeting: "Please login to see the content!",
          score: "",
          userLogged: "none"
        });
      }
    })
  };

  // Find a way to store these value in answersForm array
  handleWhichTask1 = () => {
    const whichTask = document.getElementById("cleaned").value;
    const floor = document.getElementById("cleanedFloor");
    const surfaces = document.getElementById("cleanedSurfaces");
    const trash = document.getElementById("cleanedTrash");
    const other = document.getElementById("cleanedOther");
    const living = document.getElementById("whereLiving");
    const kitchen = document.getElementById("whereKitchen");
    const entrance = document.getElementById("whereEntrance");
    const halls = document.getElementById("whereHalls");

    // Pass data via State whatCleaned
    floor.onclick = () => {
      this.setState({ whatCleaned: "floor" });
    };
    surfaces.onclick = () => {
      this.setState({ whatCleaned: "surfaces" });
    };
    trash.onclick = () => {
      this.setState({ whatCleaned: "trash" });
    };
    other.onclick = () => {
      this.setState({ whatCleaned: "other" });
    };

    // Add all the variable into the Array and store the sum
    living.onclick = () => {
      if (this.state.whatCleaned === "floor") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, floor.value, living.value) });
      }
      if (this.state.whatCleaned === "surfaces") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, surfaces.value, living.value) });
      }
      if (this.state.whatCleaned === "trash") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, trash.value, living.value) });
      }
      if (this.state.whatCleaned === "other") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, other.value, living.value) });
      }
      this.handlePointsEarned();
    };

    kitchen.onclick = () => {
      if (this.state.whatCleaned === "floor") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, floor.value, kitchen.value) });
      }
      if (this.state.whatCleaned === "surfaces") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, surfaces.value, kitchen.value) });
      }
      if (this.state.whatCleaned === "trash") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, trash.value, kitchen.value) });
      }
      if (this.state.whatCleaned === "other") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, other.value, kitchen.value) });
      }
      this.handlePointsEarned();
    };

    entrance.onclick = () => {
      if (this.state.whatCleaned === "floor") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, floor.value, entrance.value) });
      }
      if (this.state.whatCleaned === "surfaces") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, surfaces.value, entrance.value) });
      }
      if (this.state.whatCleaned === "trash") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, trash.value, entrance.value) });
      }
      if (this.state.whatCleaned === "other") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, other.value, entrance.value) });
      }
      this.handlePointsEarned();
    };

    halls.onclick = () => {
      if (this.state.whatCleaned === "floor") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, floor.value, halls.value) });
      }
      if (this.state.whatCleaned === "surfaces") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, surfaces.value, halls.value) });
      }
      if (this.state.whatCleaned === "trash") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, trash.value, halls.value) });
      }
      if (this.state.whatCleaned === "other") {
        this.setState({ answersForm: this.state.answersForm.concat(whichTask, other.value, halls.value) });
      }
      this.handlePointsEarned();
    };
  }

  handleWhichTask2 = () => {
    const whichTask = document.getElementById("payed").value;
    const whatPayed = document.getElementById("whatPayed").value;
    const howMuch = document.getElementById("howMuch").value;

    if (whatPayed && howMuch) {
      this.setState({ answersForm: this.state.answersForm.push(whichTask, whatPayed, howMuch) });
      console.log(this.state.answersForm);
    };
  }

  // Add all the locical calculs to share the points here
  handlePointsEarned = () => {
    if (this.state.answersForm.length === 3) {
      // Make auth and firestore references
      const auth = firebase.auth();
      const db = firebase.firestore();
      auth.onAuthStateChanged(user => {
        // Initialize score of the user in db
        db.collection("users").doc(user.uid).update({
          score: firebase.firestore.FieldValue.increment(20)
        })
          .then(function () {
            console.log("Document successfully written!");
          })
        console.log("Array answersForm.lenght vaut 3", this.state.answersForm);
      });
      // alert("You have earned X points for " + this.state.answersForm[0] + " the " + this.state.answersForm[1] + " in the " + this.state.answersForm[2] + "!!");
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <h3>{this.state.score}</h3>
        <p>
          Here will be the list of your flatmates. You'll be able to check their scores and see who participated the most in the house life.
        </p>

        <div>
          {/* Modal Trigger */}
          <a className="waves-effect waves-light btn modal-trigger" style={{ display: this.state.userLogged }} href="#modal1">Add a task</a>

          {/* Main Modal */}
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>What did you do today?</h4>
              <button className="waves-effect waves-light btn modal-trigger" id="cleaned" href="#modalCleaned" value="cleaned" onClick={this.handleWhichTask1}>Cleaned something</button>
              <button className="waves-effect waves-light btn modal-trigger" id="payed" href="#modalPay" value="payed" onClick={this.handleWhichTask2}>Pay something</button>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
            </div>
          </div>

          {/* Secondary Modals */}
          <div id="modalCleaned" className="modal">
            <div className="modal-content">
              <h4>What did you cleaned?</h4>
              <button className="waves-effect waves-light btn modal-trigger" id="cleanedFloor" value="floor" href="#modalCleanedWhere" onClick={this.handleWhichTask1}>Floor</button>
              <button className="waves-effect waves-light btn modal-trigger" id="cleanedSurfaces" value="surfaces" href="#modalCleanedWhere" onClick={this.handleWhichTask1}>Surfaces</button>
              <button className="waves-effect waves-light btn modal-trigger" id="cleanedTrash" value="trash" href="#modalCleanedWhere" onClick={this.handleWhichTask1}>Trash</button>
              <button className="waves-effect waves-light btn modal-trigger" id="cleanedOther" value="other" href="#modalCleanedWhere" onClick={this.handleWhichTask1}>Other</button>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
            </div>
          </div>

          <div id="modalPay" className="modal">
            <div className="modal-content">
              <h4>What did you buy?</h4>
              <form>
                <input type="text" id="whatPayed" placeholder="Type here" required />
                <input type="number" id="howMuch" placeholder="How much did you pay?" max="100" required />
                <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={this.handleWhichTask2} >Next</a>
              </form>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
            </div>
          </div>

          {/* Tertiary Modals */}
          <div id="modalCleanedWhere" className="modal">
            <div className="modal-content">
              <h4>From which room?</h4>
              <button className="waves-effect waves-light btn modal-trigger" id="whereLiving" value="living" href="#modalThankYou" onClick={this.handleWhichTask1}>Living</button>
              <button className="waves-effect waves-light btn modal-trigger" id="whereKitchen" value="kitchen" href="#modalThankYou" onClick={this.handleWhichTask1}>Kitchen</button>
              <button className="waves-effect waves-light btn modal-trigger" id="whereEntrance" value="entrance" href="#modalThankYou" onClick={this.handleWhichTask1}>Entrance</button>
              <button className="waves-effect waves-light btn modal-trigger" id="whereHalls" value="halls" href="#modalThankYou" onClick={this.handleWhichTask1}>Halls</button>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
            </div>l
          </div>

          {/* Quaternary Modals */}
          <div id="modalThankYou" className="modal">
            <div className="modal-content">
              <h4>Thank you mate!</h4>
              <p>We will send a notification to your flatmate to let them know ;)</p>
              <h5>You earn 20 points for your participation in the house!</h5>
            </div>
            <div className="modal-footer">
              <a href="/flatmates" className="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Flatmates;