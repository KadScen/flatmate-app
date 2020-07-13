import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import swal from '@sweetalert/with-react';

class TaskList2 extends Component {
    state = {
        listTasksSize: 0,
        listPaimentsSize: 0,
        houseName: ""
    }

    componentDidMount() {
        const ulTasks = document.getElementById('listTasks');
        const ulPaiments = document.getElementById('listPaiments');

        function listTasks(doc) {
            let li = document.createElement('li');
            let text = document.createElement('p');

            li.setAttribute('data-id', doc.id);
            Object.assign(li, {
                className: 'collection-item',
                'data-id': doc.id,
            });
            li.style.cursor = 'pointer';
            text.textContent = `The ${doc.data().task} needs to be cleaned in the ${doc.data().room}.`;

            li.appendChild(text);
            ulTasks.appendChild(li);
            li.addEventListener("click", myFunction);

            function myFunction() {
                swal({
                    title: "So, you have completed this task?",
                    text: "Once validated, it will be marked as completed!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal(`Thank you, for your work. ${doc.data().points} point(s) has been given to you and we will let your flatmate know that!`, {
                                icon: "success",
                            });
                            const auth = firebase.auth();
                            auth.onAuthStateChanged(user => {
                                db.collection("users").doc(user.uid).update({
                                    score: firebase.firestore.FieldValue.increment(doc.data().points)
                                })
                                    .then(function () {
                                        db.collection('tasks').doc(doc.id).set({
                                            archive: true,
                                            archivedDate: firebase.firestore.Timestamp.now()
                                        }, { merge: true });
                                        ulTasks.innerHTML = "";
                                        console.log("Document successfully written!");
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                    });
                            });
                            db.collection("users").doc(doc.data().user).update({
                                score: firebase.firestore.FieldValue.increment(0.5)
                            })
                                .then(function () {
                                    console.log("Task requester successfully compensated!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                        } else {
                            swal("Ok! The task stays here until someone does it!");
                        }
                    });
            };
        };

        function listPaiments(doc) {
            let li = document.createElement('li');
            let text = document.createElement('p');

            li.setAttribute('data-id', doc.id);
            Object.assign(li, {
                className: 'collection-item',
                'data-id': doc.id,
            });
            li.style.cursor = 'pointer';
            text.textContent = `A ${doc.data().whatToPay} needs to be payed. It's around $${doc.data().howMuch}.`;

            li.appendChild(text);
            ulPaiments.appendChild(li);
            li.addEventListener("click", myFunction);

            function myFunction() {
                swal({
                    title: "So, you have completed this task?",
                    text: "Once validated, it will be marked as completed!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal(`Thank you for buying a ${doc.data().whatToPay}. ${doc.data().points} point(s) has been given to you and we will let your flatmate know that!`, {
                                icon: "success",
                            });
                            const auth = firebase.auth();
                            auth.onAuthStateChanged(user => {
                                db.collection("users").doc(user.uid).update({
                                    score: firebase.firestore.FieldValue.increment(doc.data().points)
                                })
                                    .then(function () {
                                        db.collection('tasks').doc(doc.id).set({
                                            archive: true,
                                            archivedDate: firebase.firestore.Timestamp.now()
                                        }, { merge: true });
                                        ulPaiments.innerHTML = "";
                                        console.log("Document successfully written!");
                                    })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                    });
                            });
                        } else {
                            swal("Ok! The task stays here until someone does it!");
                        }
                    });
            };
        };

        const auth = firebase.auth();
        const db = firebase.firestore();
        auth.onAuthStateChanged(user => {
            if (user) {
                // Get data
                db.collection("users").doc(user.uid).get().then(doc => {
                    const data = doc.data();

                    db.collection("tasks").where("what", "==", "cleaning").where("archive", "==", false).where("houseName", "==", data.houseName).limit(15).onSnapshot(snapshot => {
                        snapshot.forEach(doc => {
                            listTasks(doc);
                        });
                        this.setState({ listTasksSize: snapshot.size });
                    });
                    db.collection("tasks").where("what", "==", "payed").where("archive", "==", false).where("houseName", "==", data.houseName).limit(15).onSnapshot(snapshot => {
                        snapshot.forEach(doc => {
                            listPaiments(doc);
                        });
                        this.setState({ listPaimentsSize: snapshot.size });
                    });
                });
            };
        });
    }

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems);
        });

        return (
            <div className="container">
                <ul className="collapsible popout">
                    <li>
                        <div className="collapsible-header">
                            Cleaning tasks
        <span className="badge">{this.state.listTasksSize}</span>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection" id="listTasks"></ul>
                        </div>
                    </li>
                    <li>
                        <div className="collapsible-header">
                            Paiment tasks
                            <span className="badge">{this.state.listPaimentsSize}</span>
                        </div>
                        <div className="collapsible-body">
                            <ul className="collection" id="listPaiments"></ul>
                        </div>
                    </li>
                </ul>

            </div>
        );
    }
}

export default TaskList2;