'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {MAX_MESSAGE_LEN, MIN_MESSAGE_LEN} = require('./utils/const');
const {telegram: {allowedChats}} = require('../env');
const {trimText} = require('./utils/data');

errorsHandler(bot);

bot.on('text', async ({text, chat: {id}}) => {
    const tts = trimText(text);
    const ttsLength = tts.length;

    const sendMsg = (msg, opts = {}) => bot.sendMessage(id, msg, opts);

    if (allowedChats.includes(id)) {
        if (ttsLength > MAX_MESSAGE_LEN) {
            await sendMsg(`Команда Алисе должна быть не длиннее 100 символов\n\nОтправлено: ${ttsLength}`);

        } else if (ttsLength < MIN_MESSAGE_LEN) {
            await sendMsg('Команда Алисе должна содержать не менее двух букв');

        } else {
            try {
                await iot.send({value: tts});
            } catch (err) {
                return sendMsg(err.message);
            }

            await sendMsg(
                `Отправлено:\n\n\`\`\`\n${tts}\n\`\`\``,
                {parse_mode: 'Markdown'},
            );
        }
    }
});
