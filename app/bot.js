'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {telegram: {allowedChats}} = require('../env');

const MIN_MESSAGE_LEN = 2;
const MAX_MESSAGE_LEN = 100;

errorsHandler(bot);

bot.on('text', async ({text, chat: {id}}) => {
    if (allowedChats.includes(id)) {
        const sendMsg = (msg, opts = {}) => bot.sendMessage(id, msg, opts);

        if (text.length < MIN_MESSAGE_LEN) {
            return sendMsg('Команда Алисе должна содержать не менее двух букв');
        }

        if (text.length > MAX_MESSAGE_LEN) {
            return sendMsg('Команда Алисе должна быть не длиннее 100 символов');
        }

        try {
            const {value} = await iot.send({value: text});
            await sendMsg(
                `Отправлено:\n\n\`\`\`\n${value}\n\`\`\``,
                {parse_mode: 'Markdown'},
            );
        } catch (err) {
            await sendMsg(err.message);
        }
    }
});
