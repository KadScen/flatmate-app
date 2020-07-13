import React, { Component } from "react";
import swal from '@sweetalert/with-react';

import TaskList2 from "./TaskList2";
import AddNewTask from "./AddNewTask";
import "../css/Home.css";
import '../config/fbConfig.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

class Home extends Component {
  state = {
    greeting: "",
    showLoggedOn: "",
    showLoggedOff: ""
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
            greeting: "Hello " + data.name + "!",
            showLoggedOn: "block",
            showLoggedOff: "none"
          });
        });
        $(".loginDiv").remove();
      } else {
        this.setState({
          greeting: "",
          showLoggedOn: "none",
          showLoggedOff: "block"
        });
      };
    });

    // const isHome = $('#isHome').is(':checked');
    // $("#isHome").change(function () {
    //   console.log("isHome = ", $('#isHome').is(':checked'));
    //   // FIND HOW TO HIDE HERE!!!
    //   $("#signup-houseName").toggleClass('hideOnSwitch');
    // });

    // SignUp
    const signupForm = document.querySelector('.signup');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("switch works!!", $('#isHome').is(':checked'));

      // Get user info
      const name = signupForm['signup-name'].value;
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;
      const houseName = signupForm['signup-houseName'].value;

      if (password.length < 8) {
        e.preventDefault();
        swal("Password should be min 8 characteres");
      } else {
        // Sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
          signupForm.reset();
          // Initialize score of the user in db
          db.collection("users").doc(cred.user.uid).set({
            name: name,
            email: cred.user.email,
            score: 0,
            houseName: houseName
          })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        });
      };
    });

    // Login
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get user info
      const email = loginForm['loginEmail'].value;
      const password = loginForm['loginPassword'].value;

      auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Close the login modal and reset the form
        loginForm.reset();
        console.log("User logged-in", email, " ", password);
      });
    });
  };

  render() {
    $("#signUpTab").click(function () {
      $(".signup").toggle();
      $("#loginForm").toggle();
      $("#signUpTab").toggleClass('active');
      $("#signInTab").toggleClass('active');
      $("#signInTab").toggleClass('inactive');
    });
    $("#signInTab").click(function () {
      $(".signup").toggle();
      $("#loginForm").toggle();
      $("#signInTab").toggleClass('active');
      $("#signUpTab").toggleClass('active');
      $("#signUpTab").toggleClass('inactive');
    });

    return (
      <div className="homeHeader">
        <div className="greeting" style={{ display: this.state.showLoggedOn }}>
          <h1>{this.state.greeting}</h1>
          <div style={{ display: this.state.showLoggedOn }}>
            <p id="pGreeting">Here is the list of what's need to be done.</p>
            <TaskList2 />
            <div className="mainButtons valign-wrapper center-block">
              <a href="/#">
                <AddNewTask />
              </a>
              <a href="/flatmates">
                <div className="actionsBtn valign-wrapper">
                  <p className="center-block">Flatmates</p>
                </div>
              </a>
              <a href="/historic">
                <div className="actionsBtn valign-wrapper">
                  <p className="center-block">Historic</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="loginDiv" style={{ display: this.state.showLoggedOff }}>
          <div className="wrapper fadeInDown">
            <div id="formContent">
              {/* <!-- Tabs Titles --> */}
              <h2 id="signInTab" className="active underlineHover"> Sign In </h2>
              <h2 id="signUpTab" className="inactive underlineHover">Sign Up </h2>

              {/* <!-- Signup Form --> */}
              <form className="signup">
                <div className="inputField">
                  <input type="text" id="signup-name" className="fadeIn second" name="name" placeholder="name*" required />
                  <input type="email" id="signup-email" className="fadeIn second" name="email" placeholder="email*" required />
                  <input type="password" id="signup-password" className="fadeIn third" name="password" placeholder="password*" required />
                  <p className="fadeIn third">Join or Create a new house?</p>
                  {/* <div className="switch">
                    <label>
                      Join
                      <input type="checkbox" id="isHome" />
                      <span className="lever"></span>
                      Create
                    </label>
                  </div> */}
                  <input type="textarea" id="signup-houseName" className="fadeIn third" placeholder="Name it here*" required />
                </div>
                <input type="submit" className="fadeIn fourth" value="Sign Up" />
              </form>

              {/* <!-- Login Form --> */}
              <form id="loginForm">
                <div className="inputField">
                  <input type="email" id="loginEmail" className="fadeIn second" name="login" placeholder="login" required />
                  <input type="password" id="loginPassword" className="fadeIn third" name="login" placeholder="password" required />
                </div>
                <input type="submit" className="fadeIn fourth" value="Log In" />
                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter">
                  <a className="underlineHover" href="!#">Forgot Password?</a>
                </div>
              </form>


            </div>
          </div>
        </div>

      </div>
    );
  };
};

export default Home;
