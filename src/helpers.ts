export async function get_variables(update: {
    message: { chat: { id: any }; text: any };
}) {
    const message = update.message;
    const id = update.message.chat.id;
    const text = update.message.text;
    return [message, id, text];
}
