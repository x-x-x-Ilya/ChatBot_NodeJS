import { logError } from '../middleware/logging';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/database");

export const firebaseDatabase = () : void => {
  const config = {
    apiKey: "AIzaSyDqgOuudlQBI8NQRv2lt7ku8BSe8cLReSE",
    authDomain: "barber-shop-b2a01.firebaseapp.com",
    databaseURL: "https://barber-shop-b2a01.firebaseio.com",
    projectId: "barber-shop-b2a01",
    storageBucket: "barber-shop-b2a01.appspot.com",
    messagingSenderId: "382669981438",
    appId: "1:382669981438:web:83cfd8fcf663635a0147af",
    measurementId: "G-Y2JLGR1C2L"
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
