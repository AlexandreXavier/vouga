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

  //portocaro
  /* apiKey: "AIzaSyDTA15Tke9ro-bc726Pla4kLBgzOWfmz74",
  authDomain: "portocarodos-93f3e.firebaseapp.com",
  databaseURL: "https://portocarodos-93f3e.firebaseio.com",
  projectId: "portocarodos-93f3e",
  storageBucket: "portocarodos-93f3e.appspot.com",
  messagingSenderId: "671294892710" */
};

firebase.initializeApp(config);

// firebase utils
/* const db = firebase.firestore();
const auth = firebase.auth();
const user = auth.getCurrentUser;
const currentUser = user; */

//const team = [];

// firebase collections
//const usersCollection = db.collection("users");

//add Date
/* var data = {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
};

// Add a new document in collection "cities" with ID 'LA'
var setDoc = db
  .collection("cities")
  .doc("LA")
  .set(data); */

const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
