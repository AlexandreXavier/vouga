import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDTA15Tke9ro-bc726Pla4kLBgzOWfmz74",
  authDomain: "portocarodos-93f3e.firebaseapp.com",
  databaseURL: "https://portocarodos-93f3e.firebaseio.com",
  projectId: "portocarodos-93f3e",
  storageBucket: "portocarodos-93f3e.appspot.com",
  messagingSenderId: "671294892710"
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
