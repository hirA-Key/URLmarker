import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAM1q7ES_ilLBnoK66mlXOJMLelJhjEbuQ",
  authDomain: "hiramark-c06a4.firebaseapp.com",
  databaseURL: "https://hiramark-c06a4-default-rtdb.firebaseio.com",
  projectId: "hiramark-c06a4",
  storageBucket: "hiramark-c06a4.appspot.com",
  messagingSenderId: "770997750386",
  appId: "1:770997750386:web:a60ceb6473b8379cb0d0eb",
  measurementId: "G-ZL48QK8FZH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
