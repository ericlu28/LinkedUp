import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHTiUud5Lnk4Dz20xnqBPhDNbW5XzBNLI",
    authDomain: "linkedinternships.firebaseapp.com",
    projectId: "linkedinternships",
    storageBucket: "linkedinternships.appspot.com",
    messagingSenderId: "91015719076",
    appId: "1:91015719076:web:17f8120502b8a090ff1e31",
    measurementId: "G-VB5YRWP6KZ"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // Use these for db & auth
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider()
  export { auth, provider }
  export default db