import { logError } from '../middleware/logging';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/database");

export const firebaseDatabase = () : void => {
  const config = {
<<<<<<< HEAD
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
=======
    apiKey: "",
    authDomain: "",
    databaseURL: ""
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
>>>>>>> d2f0666abd13e3f68a25ccb5059baa07373a01a8
  };
  firebase.initializeApp(config);
  const database = firebase.database();
};

export const writeClientData = (id: number, first_name: string, email: string, last_name: string) : void => {
    firebase.database().ref('clients/' + id).set({
      first_name: first_name,
      email: email,
      profile_picture: last_name,
      deleted: false
    },function(e) {
      if (e) {
        logError(e);
      } else {
        // Data saved successfully!
      }
    })
};

export const updateClientEmail = (id: number, email: string): void => {
  firebase.database().ref('clients/' + id).update({
    email: email
  }, function(e) {
    if (e) {
      logError(e);
    } else {
      // Data saved successfully!
    }
  })
};

export const updateClientLastName = (id: number, last_name: string): void  => {
  firebase.database().ref('clients/' + id).update({
    last_name: last_name
  }, function(e) {
    if (e) {
      logError(e);
    } else {
      // Data saved successfully!
    }
  })
};
