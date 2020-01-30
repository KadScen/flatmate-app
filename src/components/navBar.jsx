import React, { Component } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../config/fbConfig.js';

import firebase from 'firebase/app';
import 'firebase/auth';

class NavBar extends Component {
  state = {};

  componentDidMount() {
    // Was supposed to be in a sep file in /config/fbConfig.js
    // Make auth and firestore references
    const auth = firebase.auth();
    const db = firebase.firestore();
    const loggedOutLinks = document.querySelectorAll('.logged-out');
    const loggedInLinks = document.querySelectorAll('.logged-in');

    const setupUI = (user) => {
      if (user) {
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
      } else {
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
      }
    }

    // Listen for auth status changes
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User logged in ', user.email);
        setupUI(user);
      } else {
        console.log('User logged out');
        setupUI();
      }
    })

    // Was supposed to be in a sep file in /scripts/index.js
    // Setup materialize components
    document.addEventListener('DOMContentLoaded', function () {

      var modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

    });

    // Was supposed to be in a sep file in /scripts/auth.js
    // SignUp
    const signupForm = document.querySelector('#signup-form');
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get user info
      const name = signupForm['signup-name'].value;
      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;

      // Sign up the user
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        // Initialize score of the user in db
        db.collection("users").doc(cred.user.uid).set({
          name: name,
          email: cred.user.email,
          score: 0
        })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })

    });

    // Logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut();
    });

    // Login
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get user info
      const email = loginForm['login-email'].value;
      const password = loginForm['login-password'].value;

      auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
      });
    })
  }

  render() {
    return (
      <div>

        <ul className="nav nav-tabs bg-light" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="/home">
              Home
          </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="/flatmates">
              Flatmates
          </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="/chat">
              Chat
          </a>
          </li>
          <li className="nav-item logged-in" style={{ display: 'none' }}>
            <a href="/#" className="nav-link grey-text" id="logout">Logout</a>
          </li>
          <li className="nav-item logged-out" style={{ display: 'none' }}>
            <a href="/#" className="nav-link grey-text modal-trigger" data-target="modal-login">Login</a>
          </li>
          <li className="nav-item logged-out" style={{ display: 'none' }}>
            <a href="/#" className="nav-link grey-text modal-trigger" data-target="modal-signup">Sign up</a>
          </li>
        </ul>

        {/* SIGN UP MODAL */}
        <div id="modal-signup" className="modal">
          <div className="modal-content">
            <h4>Sign up</h4>
            <br />
            <form id="signup-form">
              <div className="input-field">
                <input type="text" id="signup-name" required />
                <label htmlFor="signup-name">Your name</label>
              </div>

              <div className="input-field">
                <input type="email" id="signup-email" required />
                <label htmlFor="signup-email">Email address</label>
              </div>
              <div className="input-field">
                <input type="password" id="signup-password" required />
                <label htmlFor="signup-password">Choose password</label>
              </div>
              <button className="btn yellow darken-2 z-depth-0">Sign up</button>
              <p className="error pink-text center-align" />
            </form>
          </div>
        </div>

        {/* LOGIN MODAL */}
        <div id="modal-login" className="modal">
          <div className="modal-content">
            <h4>Login</h4><br />
            <form id="login-form">
              <div className="input-field">
                <input type="email" id="login-email" required />
                <label htmlFor="login-email">Email address</label>
              </div>
              <div className="input-field">
                <input type="password" id="login-password" required />
                <label htmlFor="login-password">Your password</label>
              </div>
              <button className="btn yellow darken-2 z-depth-0">Login</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default NavBar;
