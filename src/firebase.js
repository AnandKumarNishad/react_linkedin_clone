import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDHYRxuystw3oiOsKbxfVR2QGNL3wxtIZM",
    authDomain: "linkedin-clone-60bd5.firebaseapp.com",
    projectId: "linkedin-clone-60bd5",
    storageBucket: "linkedin-clone-60bd5.appspot.com",
    messagingSenderId: "610819388814",
    appId: "1:610819388814:web:eebfff03122a9af744a0df",
    measurementId: "G-ZEHDV23676"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;