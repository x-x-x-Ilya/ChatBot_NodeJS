import { TelegramMessage } from './middleware/TelegramClasses';

class Claims {
    message: TelegramMessage;
    id: number;
    text: string;
}

export async function getVariables(update: any): Promise<Claims> {
    const message = update.message;
    const id = update.message.chat.id;
    const text = update.message.text;
    return {
        message: message,
        id: id,
        text: text,
    };
}
