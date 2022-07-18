import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCnIkncYwOv8bIXpbppYlZ58ko8V6Umhc",
  authDomain: "nxtjs-fb.firebaseapp.com",
  projectId: "nxtjs-fb",
  storageBucket: "nxtjs-fb.appspot.com",
  messagingSenderId: "514511324984",
  appId: "1:514511324984:web:b0836110ded3a691dee3cd"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage };

