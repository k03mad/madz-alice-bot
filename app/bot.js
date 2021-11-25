'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {telegram: {allowedChats}} = require('../env');
const {trimText, MAX_MESSAGE_LEN} = require('./utils/data');

errorsHandler(bot);

bot.on('text', async ({text, chat: {id}}) => {
    const value = trimText(text);
    const valueLen = value.length;
    const sendMsg = msg => bot.sendMessage(id, msg);

    if (allowedChats.includes(id)) {
        if (valueLen > MAX_MESSAGE_LEN) {
            await sendMsg(`Команда Алисе должна быть не длиннее 100 символов\n\nОтправлено: ${valueLen}`);

        } else {
            try {
                await iot.send({value});
                await sendMsg('✓');
            } catch (err) {
                await sendMsg(err.message);
            }
        }
    }
});
