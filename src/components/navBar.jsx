import React, { Component } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';

import '../config/fbConfig.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import "../css/navBar.css";

import firebase from 'firebase/app';
import 'firebase/auth';

class NavBar extends Component {
  state = {};

  componentDidMount() {
    // Was supposed to be in a sep file in /config/fbConfig.js
    // Make auth and firestore references
    const auth = firebase.auth();
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
      var sidenav = document.querySelectorAll('.sidenav');
      M.Sidenav.init(sidenav);
    });

    // Logout
    const logout = document.querySelector('.logout');
    logout.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut();
      window.location.reload();
    });

    // Logout from SideBar
    const logoutSide = document.querySelector('.logoutSide');
    logoutSide.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut();
      window.location.reload();
    });
  };

  render() {
    return (
      <div>
        <nav id="navBar">
          <div className="nav-wrapper">
            <a href="/#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="left hide-on-med-and-down" role="tablist">
              <li className="active">
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/flatmates">Flatmates</a>
              </li>
              <li>
                <a href="/chat">Chat</a>
              </li>
              <li>
                <a href="/historic">Historic</a>
              </li>
              <li className="logged-in" style={{ display: 'none' }}>
                <a href="/#" className="logout nav-link grey-text">Logout</a>
              </li>
              <li className="logged-out" style={{ display: 'none' }}>
                <a href="/#" className="nav-link grey-text modal-trigger" data-target="modal-login">Login</a>
              </li>
              <li className="logged-out" style={{ display: 'none' }}>
                <a href="/#" className="nav-link grey-text modal-trigger" data-target="modal-signup">Sign up</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li className="active">
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/flatmates">Flatmates</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <a href="/historic">Historic</a>
          </li>
          <li className="logged-in" style={{ display: 'none' }}>
            <a href="/#" className="logoutSide nav-link grey-text">Logout</a>
          </li>
          <li className="logged-out" style={{ display: 'none' }}>
            <a href="/home" className="nav-link grey-text">Login/SignUp</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
