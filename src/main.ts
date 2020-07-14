import * as TelegramBot from 'node-telegram-bot-api';
import { connect } from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from "fs";

/*
import firebase from 'firebase/app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const functions = require('firebase/functions');

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
firebase.initializeApp (firebaseConfig);
*/

export const bot = new TelegramBot(process.env.TOKEN, {
  webHook: {
    port: 80
  }
});

// start ngrok http 80  // for test on local machine
const address = 'https://1d445b6a5401.ngrok.io/bot' + process.env.TOKEN;

async function bootstrap() {
  connect().then(async () => {
    try {
      bot.setWebHook(address);
      bot.on('webhook_error', (error) => {
        console.log(error.code);  // => 'EPARSE'
        fs.appendFileSync('./logs/_errors.txt',JSON.stringify( error, null, '\t') + ' ' + new Date());
      });
      init.init();
      const app = await NestFactory.create(AppModule);
      await app.listen(80);
    } catch (e) {
      console.log(e);
    }
  });
}
bootstrap();