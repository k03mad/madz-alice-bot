'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {telegram: {allowedChats}} = require('../env');

errorsHandler(bot);

bot.on('text', async ({text, chat}) => {
    const value = text.trim();
    const sendMsg = msg => bot.sendMessage(chat.id, msg);

    if (allowedChats.includes(chat.id)) {
        if (value.length > 1000) {
            await sendMsg('Сообщение слишком длинное');

        } else if (value.length < 2) {
            await sendMsg('Сообщение слишком короткое');

        } else {
            await iot.send({value});
            await sendMsg('Отправлено');
        }
    }
});
