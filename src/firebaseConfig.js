import Firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnYk6tSP5OxF-tYI1F8q518UIkgqkUAJQ",
    authDomain: "vue-firebase-tutorial2.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial2.firebaseio.com",
    projectId: "vue-firebase-tutorial2",
    storageBucket: "vue-firebase-tutorial2.appspot.com",
    messagingSenderId: "68896374963"
  };
  
const firebaseApp = Firebase.initializeApp(config);

const db = firebaseApp.database();

export {firebaseApp, db};