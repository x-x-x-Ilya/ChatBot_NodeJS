//"nest start",
/*
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
//<script src="https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/7.15.4/firebase-analytics.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyDqgOuudlQBI8NQRv2lt7ku8BSe8cLReSE",
  authDomain: "barber-shop-b2a01.firebaseapp.com",
  databaseURL: "https://barber-shop-b2a01.firebaseio.com",
  projectId: "barber-shop-b2a01",
  storageBucket: "barber-shop-b2a01.appspot.com",
  messagingSenderId: "382669981438",
  appId: "1:382669981438:web:83cfd8fcf663635a0147af",
  measurementId: "G-Y2JLGR1C2L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
*/



import * as TelegramBot from 'node-telegram-bot-api';
import {connect } from './database/synchronization';
import { API } from './API';
const token = process.env.TOKEN;

connect().then(() => {
  try {
    const bot = new TelegramBot(token, { polling: true });
    new API(bot);

  } catch (e) {
    console.log(e);
  }
});

