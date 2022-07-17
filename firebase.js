import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA3oYv9VAlGSE5CjiGi54_qNVQLJjstYM8",
    authDomain: "js-social-c2bcc.firebaseapp.com",
    projectId: "js-social-c2bcc",
    storageBucket: "js-social-c2bcc.appspot.com",
    messagingSenderId: "839079305265",
    appId: "1:839079305265:web:25cbaa209778808fe4b510",
    measurementId: "G-ZBKDR1D2EN"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };

