import firebase from "firebase";

var config = {
  //vouga
  apiKey: "AIzaSyDd6S1QM74997vXOgcigr5wRdvzdog1d38",
  authDomain: "vouga-720eb.firebaseapp.com",
  databaseURL: "https://vouga-720eb.firebaseio.com",
  projectId: "vouga-720eb",
  storageBucket: "vouga-720eb.appspot.com",
  messagingSenderId: "632238300092",
  appId: "1:632238300092:web:58f8c4dcc608cf9a"
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
