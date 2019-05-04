import firebase from "firebase";

var config = {
  apiKey: "",
  authDomain: "m",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
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
