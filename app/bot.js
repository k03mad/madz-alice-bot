'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');

errorsHandler(bot);

bot.on('text', async msg => {
    const value = msg.text.trim();
    const {id} = msg.chat;

    if (value.length > 1000) {
        await bot.sendMessage(id, 'Сообщение слишком длинное');

    } else if (value.length < 2) {
        await bot.sendMessage(id, 'Сообщение слишком короткое');

    } else {
        await iot.send({value});
        await bot.sendMessage(id, 'Отправлено');
    }
});
