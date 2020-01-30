import React, { Component } from 'react';
import "../scripts/index";

import firebase from 'firebase/app';
import 'firebase/auth';

class Flatmates extends Component {
  state = {
    greeting: "",
    score: "",
    userLogged: "",
    answersForm: []
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
    const floor = document.getElementById("cleanedFloor").value;
    const surfaces = document.getElementById("cleanedSurfaces").value;
    const trash = document.getElementById("cleanedTrash").value;
    const other = document.getElementById("cleanedOther").value;

    if (surfaces) {
      this.setState({ answersForm: this.state.answersForm.push(whichTask) });
      console.log(this.state.answersForm);
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
              <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou">Living</a>
              <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou">Kitchen</a>
              <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou">Entrance</a>
              <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou">Halls</a>
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