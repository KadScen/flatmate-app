import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import "../css/AddNewTask.css";
import $ from 'jquery';

class AddNewTask extends Component {
    state = {
        answersForm: [],
        whatDid: "",
        whereCleaned: "",
        whatCleaned: "",
        houseName: ""
    }

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
                        houseName: data.houseName
                    });
                });
            } else {
                this.setState({
                    greeting: "Please login to see the content!",
                    score: ""
                });
            }
        });

        //Hide showOnClick div
        $(".cleanedOther").click(function () {
            $(".showOnClick").toggle();
        });
    };

    // Find a way to store these value in answersForm array
    handleWhichTask1 = () => {
        this.setState({ whatDid: "cleaning" });
    };

    handleWhereCleaned = (e) => {
        this.setState({ whereCleaned: e.target.value });
        console.log("The state is " + this.state.whereCleaned);
    };

    handleWhatCleaned = (e) => {
        let cleanedOther2 = "";
        switch (this.state.whereCleaned) {
            case "living":
                cleanedOther2 = document.getElementById('cleanedOtherLiving');
                break;

            case "kitchen":
                cleanedOther2 = document.getElementById('cleanedOtherKitchen');
                break;

            case "entrance":
                cleanedOther2 = document.getElementById('cleanedOtherEntrance');
                break;

            case "halls":
                cleanedOther2 = document.getElementById('cleanedOtherHalls');
                break;

            default:
                break;
        }

        console.log("Switch methode works!! ", cleanedOther2.value);
        if (cleanedOther2.value !== "") {
            this.setState({ answersForm: this.state.answersForm.push(this.state.whatDid, this.state.whereCleaned, cleanedOther2.value) });
            if (this.state.answersForm.length === 3) {
                const auth = firebase.auth();
                const db = firebase.firestore();


                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: this.state.whatDid,
                        room: this.state.whereCleaned,
                        task: cleanedOther2.value,
                        points: 1,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 1 });
            };
        } else {
            // If imput is empty
            this.setState({ answersForm: this.state.answersForm.push(this.state.whatDid, this.state.whereCleaned, e.target.value) });
            cleanedOther2 = e.target.value;
            console.log("target value dans cleanedOther 2 value: ", cleanedOther2);

            if (this.state.answersForm.length === 3) {
                const auth = firebase.auth();
                const db = firebase.firestore();
                switch (this.state.answersForm[2]) {
                    case "floor":
                    case "surfaces":
                    case "trash":
                    case "dishes":
                    case "table":
                    case "other":
                        auth.onAuthStateChanged(user => {
                            // Initialize score of the user in db
                            db.collection("tasks").doc().set({
                                user: user.uid,
                                what: this.state.whatDid,
                                room: this.state.whereCleaned,
                                task: cleanedOther2,
                                points: 1,
                                archive: false,
                                created: firebase.firestore.Timestamp.now(),
                                houseName: this.state.houseName
                            })
                                .then(function () {
                                    console.log("Document successfully written!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                        });
                        this.setState({ earned: 1 });
                        break;

                    case "oven":
                        auth.onAuthStateChanged(user => {
                            // Initialize score of the user in db
                            db.collection("tasks").doc().set({
                                user: user.uid,
                                what: this.state.whatDid,
                                room: this.state.whereCleaned,
                                task: this.state.whatCleaned,
                                points: 2,
                                archive: false,
                                created: firebase.firestore.Timestamp.now(),
                                houseName: this.state.houseName
                            })
                                .then(function () {
                                    console.log("Document successfully written!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                        });
                        this.setState({ earned: 2 });
                        break;

                    case "fridge":
                        auth.onAuthStateChanged(user => {
                            // Initialize score of the user in db
                            db.collection("tasks").doc().set({
                                user: user.uid,
                                what: this.state.whatDid,
                                room: this.state.whereCleaned,
                                task: this.state.whatCleaned,
                                points: 3,
                                archive: false,
                                created: firebase.firestore.Timestamp.now(),
                                houseName: this.state.houseName
                            })
                                .then(function () {
                                    console.log("Document successfully written!");
                                })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                        });
                        this.setState({ earned: 3 });
                        break;

                    default:
                }
            }
        };
        console.log(this.state.answersForm);
    };

    handleWhichTask2 = () => {
        const whichTask = document.getElementById("payed").value;
        const whatToPay = document.getElementById("whatToPay").value;
        const howMuch2 = document.getElementById("howMuch").value;
        const howMuch = howMuch2.replace(/[^0-9]/g, "");

        if (whatToPay && howMuch) {
            this.setState({ answersForm: this.state.answersForm.push(whichTask, whatToPay, howMuch) });
            console.log(this.state.answersForm);
            this.handlePointsEarned2();
        };
    };



    handlePointsEarned2 = () => {
        if (this.state.answersForm.length === 3) {
            const auth = firebase.auth();
            const db = firebase.firestore();
            const whichTask = document.getElementById("payed").value;
            const whatToPay = document.getElementById("whatToPay").value;
            const howMuch2 = document.getElementById("howMuch").value;
            const howMuch = howMuch2.replace(/[^0-9]/g, "");
            console.log(howMuch);

            if (howMuch < 3) {
                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: whichTask,
                        whatToPay: whatToPay,
                        howMuch: howMuch,
                        points: 1,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 1 });
            }

            if (howMuch >= 3 && howMuch < 5) {
                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: whichTask,
                        whatToPay: whatToPay,
                        howMuch: howMuch,
                        points: 2,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 2 });
            }

            if (howMuch >= 5 && howMuch < 10) {
                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: whichTask,
                        whatToPay: whatToPay,
                        howMuch: howMuch,
                        points: 3,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 3 });
            }

            if (howMuch >= 10 && howMuch < 20) {
                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: whichTask,
                        whatToPay: whatToPay,
                        howMuch: howMuch,
                        points: 4,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 4 });
            }

            if (howMuch >= 20) {
                auth.onAuthStateChanged(user => {
                    // Initialize score of the user in db
                    db.collection("tasks").doc().set({
                        user: user.uid,
                        what: whichTask,
                        whatToPay: whatToPay,
                        howMuch: howMuch,
                        points: 5,
                        archive: false,
                        created: firebase.firestore.Timestamp.now(),
                        houseName: this.state.houseName
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                });
                this.setState({ earned: 5 });
            }
        };
    }

    render() {
        return (
            <div className="addNewTask">
                <div className="addNewTaskBtn modal-trigger valign-wrapper" href="#modal1">
                    {/* Modal Trigger */}
                    <p className="center-block">Add a task</p>
                </div>
                {/* Main Modal */}
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>What task need to be done?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleaned" href="#modalCleanedWhere" value="cleaned" onClick={this.handleWhichTask1}>Clean something</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="payed" href="#modalPay" value="payed" onClick={this.handleWhichTask2}>Buy something</button>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                {/* Secondary Modals */}
                <div id="modalCleanedWhere" className="modal">
                    <div className="modal-content">
                        <h4>Which room needs to be cleaned?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="whereLiving" value="living" href="#modalCleanedLiving" onClick={(e) => this.handleWhereCleaned(e)}>Living</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="whereKitchen" value="kitchen" href="#modalCleanedKitchen" onClick={(e) => this.handleWhereCleaned(e)}>Kitchen</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="whereEntrance" value="entrance" href="#modalCleanedEntrance" onClick={(e) => this.handleWhereCleaned(e)}>Entrance</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="whereHalls" value="halls" href="#modalCleanedHalls" onClick={(e) => this.handleWhereCleaned(e)}>Halls</button>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                <div id="modalPay" className="modal">
                    <div className="modal-content">
                        <h4>What's need to be bought?</h4>
                        <form>
                            <input type="text" id="whatToPay" placeholder="Type here" required />
                            <input type="text" id="howMuch" placeholder="How much did you pay?" max="100" required />
                            <a className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={this.handleWhichTask2} >Next</a>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                {/* Tertiary Modals */}
                <div id="modalCleanedLiving" className="modal">
                    <div className="modal-content">
                        <h4>What's need to be cleaned?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedFloor" value="floor" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Floor</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedSurfaces" value="surfaces" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Surfaces</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedTable" value="table" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Table</button>
                        <button className="btn modal-trigger cleanedOther">Other</button>
                        <div className="showOnClick">
                            <input type="text" id="cleanedOtherLiving" placeholder="Please type and confirm" />
                            <button className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Confirm</button>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                <div id="modalCleanedKitchen" className="modal">
                    <div className="modal-content">
                        <h4>What's need to be cleaned?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedFloor" value="floor" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Floor</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedSurfaces" value="surfaces" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Surfaces</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedTrash" value="trash" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Trash</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedDishes" value="dishes" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Dishes</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedOven" value="oven" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Oven</button>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedFridge" value="fridge" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Fridge</button>
                        <button className="btn modal-trigger cleanedOther">Other</button>
                        <div className="showOnClick">
                            <input type="text" id="cleanedOtherKitchen" placeholder="Please type and confirm" />
                            <button className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Confirm</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                <div id="modalCleanedEntrance" className="modal">
                    <div className="modal-content">
                        <h4>What's need to be cleaned?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedFloor" value="floor" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Floor</button>
                        <button className="btn modal-trigger cleanedOther">Other</button>
                        <div className="showOnClick">
                            <input type="text" id="cleanedOtherEntrance" placeholder="Please type and confirm" />
                            <button className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Confirm</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                <div id="modalCleanedHalls" className="modal">
                    <div className="modal-content">
                        <h4>What's need to be cleaned?</h4>
                        <button className="waves-effect waves-light btn modal-trigger" id="cleanedFloor" value="floor" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Floor</button>
                        <button className="btn modal-trigger cleanedOther">Other</button>
                        <div className="showOnClick">
                            <input type="text" id="cleanedOtherHalls" placeholder="Please type and confirm" />
                            <button className="waves-effect waves-light btn modal-trigger" href="#modalThankYou" onClick={(e) => this.handleWhatCleaned(e)}>Confirm</button>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Back</a>
                    </div>
                </div>

                {/* Quaternary Modals */}
                <div id="modalThankYou" className="modal">
                    <div className="modal-content">
                        <h4>Thank you mate!</h4>
                        <p>We will send a notification to your flatmate to let them know ;)</p>
                        <h5>An update will allow you to collect points for your participation in the house!</h5>
                    </div>
                    <div className="modal-footer">
                        <a href="/" className="modal-close waves-effect waves-green btn-flat">Close</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewTask;