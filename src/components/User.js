import React from 'react';
import firebase from '../config/fbConfig';

class User extends React.Component {
    state = {  }

    constructor() {
        super();
        this.state = {
            email: "",
            fullname: ""
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
        });
        db.collection("project flatmate app").doc("test1").set({
          fullname: this.state.fullname,
          email: this.state.email
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.setState({
            fullname: "",
            email: ""
        });
    };

    showThat = e => {
        const db = firebase.firestore();
        db.collection("cities")
        .doc('LA')
        .get()
        .then(doc => {
          const data = doc.data();
          console.log(data.country); // LA city object with key-value pair
        });
    }

    render() { 
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.fullname}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Full name"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <button type="submit">Submit</button>
                <br/>
                <button type="submit" onClick={this.showThat}>Show</button>
            </form>
        );
    }
}
 
export default User;