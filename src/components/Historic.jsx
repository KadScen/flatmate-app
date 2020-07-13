import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Historic extends Component {
    state = {}

    componentDidMount() {
        function archiveList(doc) {
            const tbodyList = document.getElementById('tbodyList');
            let tr = document.createElement('tr');
            let text = document.createElement('p');
            let username = document.createElement('span');

            let cityRef = db.collection('users').doc(doc.data().user);
            cityRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                        username.textContent = doc.data().name;
                        text.appendChild(username);
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });

            tr.style.cursor = 'pointer';

            //Convert Timestamp to readable date
            var stringified = doc.data().archivedDate.toDate().toISOString();
            //console.log(stringified);
            var split1 = stringified.split('T');
            var date = split1[0].replace(/-/g, ' ');
            // console.log(date);
            var time = split1[1].split('.');
            // console.log(date, time[0]);
            //End of convertion

            switch (doc.data().what) {
                case "cleaning":
                    text.textContent = `${date} at ${time[0]} - The ${doc.data().task} has been cleaned in the ${doc.data().room} by `;
                    break;
                case "payed":
                    text.textContent = `${date} at ${time[0]} - A ${doc.data().whatToPay} has been payed $${doc.data().howMuch} by `;
                    break;
                default:
                    break;
            }
            tr.appendChild(text);
            tbodyList.appendChild(tr);
        };


        const auth = firebase.auth();
        const db = firebase.firestore();
        auth.onAuthStateChanged(user => {
            if (user) {
                // Get data
                db.collection("users").doc(user.uid).get().then(doc => {
                    const data = doc.data();

                    db.collection("tasks").where("houseName", "==", data.houseName).orderBy("archivedDate", "desc").limit(20).onSnapshot(snapshot => {
                        snapshot.forEach(doc => {
                            archiveList(doc);
                        });
                    });
                });
            }
        });

    };

    render() {
        return (
            <div className="container">
                <p className="center">Here is the historic of every task completed.</p>
                <table className="striped">
                    <tbody id="tbodyList"></tbody>
                </table>
            </div>
        );
    }
}

export default Historic;