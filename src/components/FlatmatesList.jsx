import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import "../css/FlatmatesList.css";

class FlatmatesList extends Component {
    state = {
        greeting: "",
        score: ""
    };

    componentDidMount() {
        const auth = firebase.auth();
        const db = firebase.firestore();
        const container = document.querySelector(".container");

        auth.onAuthStateChanged(user => {
            if (user) {
                // Get data 
                db.collection("users").doc(user.uid).get().then(doc => {
                    const data = doc.data();
                    this.setState({
                        greeting: "Hello " + data.name + "!",
                        score: "You have " + data.score + " points"
                      });
                    db.collection('users').where("houseName", "==", data.houseName).orderBy('score', 'desc').get().then(snapshot => {
                        setupBoard(snapshot.docs)
                    });
                });

                container.style.display = "block";
            } else {
                setupBoard([]);
                container.style.display = "none";
                this.setState({
                    greeting: "Please login to see the content!",
                    score: ""
                  });
            }
        });

        const boardList = document.querySelector(".boardList");

        // Setup board
        const setupBoard = (data) => {

            let html = '';
            data.forEach(doc => {
                const board = doc.data();
                const tr = `
                <tr>
                    <td>${board.name}</td>
                    <td>${board.email}</td>
                    <td>${board.score}</td>
                </tr>
                `;
                html += tr
            });
            boardList.innerHTML = html;
        }
    }
    render() {
        return (
            <div className="containerFlatmatesList">
                <div className="center">
                <h3>{this.state.greeting}</h3>
                        <h4>{this.state.score}</h4>
                    <div className="container">
                        <p>
                            Here is the list of your flatmates. You'll be able to check their scores and see who participated the most in the house life.
                        </p>
                    </div>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Score</th>
                            </tr>
                        </thead>

                        <tbody className="boardList">

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default FlatmatesList;