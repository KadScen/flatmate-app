import React, { Component } from "react";

import TaskList from "./taskList";
import "../css/Home.css";
import firebase from 'firebase/app';
import 'firebase/auth';

class Home extends Component {
  state = {
    greeting: ""
  };

  componentDidMount() {
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
            greeting: "Hello " + data.name + "!"
          });
        });
      } else {
        this.setState({
          greeting: "Please login to see the content"
        });
      }
    })
  }

  render() {
    return (
      <div>
        <div className="homeHeader">
          <h1>{this.state.greeting}</h1>
          <p>Here is the list of what's need to be done.</p>
        </div>
        <TaskList />
      </div>
    );
  }
}

export default Home;
