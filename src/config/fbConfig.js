import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAcrVMBKEKw5za7faD6TM33ELiRPIKcu4k",
  authDomain: "fir-demo-76f56.firebaseapp.com",
  databaseURL: "https://fir-demo-76f56.firebaseio.com",
  projectId: "fir-demo-76f56",
  storageBucket: "fir-demo-76f56.appspot.com",
  messagingSenderId: "1078155158388",
  appId: "1:1078155158388:web:91a190c6ed898f38f1c221"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore references
// const auth = firebase.auth();
// const db = firebase.firestore();

export default firebase;