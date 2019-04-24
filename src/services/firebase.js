import firebase from "firebase";

var config = {
  apiKey: "/* Your apiKey */",
  authDomain: /* Your authDomain */,
  databaseURL:  /* Your databaseURL */,
  projectId: /* Your projectId */,
  storageBucket: /* Your storageBucket */,
  messagingSenderId: /* Your messagingSenderId */
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export { database, storage };
