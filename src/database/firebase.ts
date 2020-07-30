import { logError } from '../middleware/logging';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/database");

export const firebaseDatabase = () : void => {
  const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: ""
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
