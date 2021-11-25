'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {telegram: {allowedChats}} = require('../env');

const MAX_LEN = 100;

errorsHandler(bot);

bot.on('text', async ({text, chat}) => {
    const value = text.trim().replace(/\n+/g, '. ');
    const valueLen = value.length;

    const sendMsg = msg => bot.sendMessage(chat.id, msg);

    if (allowedChats.includes(chat.id)) {
        if (valueLen > MAX_LEN) {
            await sendMsg(
                'Сообщение слишком длинное'
              + `\n\nСимволов: ${valueLen}`
              + `\nМаксимум: ${MAX_LEN}`,
            );

        } else {
            try {
                await iot.send({value});
                await sendMsg('✅');
            } catch (err) {
                await sendMsg(err.message);
            }
        }
    }
});
