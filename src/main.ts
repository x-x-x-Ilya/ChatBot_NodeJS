//"nest start",

import * as TelegramBot from 'node-telegram-bot-api';
import {connect } from './database/synchronization';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const init = require('./database/models/index');
import { API } from './API';
const token = process.env.TOKEN;

connect().then(() => {
  try {
    init.init();
    const bot = new TelegramBot(token, { polling: true });
    new API(bot);

  } catch (e) {
    console.log(e);
  }
});

