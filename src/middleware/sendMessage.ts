import { log } from './logging';
import { bot } from '../main';
import { errLogPath } from '../constants';

// function for sending message
export const send = (
    id: number,
    text: string,
    keyboard: { reply_markup: string },
): void => {
    log(`./logs/` + id + `.txt`, text, 'bot');
    bot.sendMessage(id, text, keyboard).catch(error => {
        log(errLogPath, error, ' ');
    });
};
