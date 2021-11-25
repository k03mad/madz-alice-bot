'use strict';

const bot = require('./telegram/config');
const errorsHandler = require('./telegram/errors');
const {iot} = require('@k03mad/utils');
const {splitStrings, checkForIncorrectMessage} = require('./utils/data');
const {telegram: {allowedChats}} = require('../env');

errorsHandler(bot);

bot.on('text', async ({text, chat: {id}}) => {
    if (allowedChats.includes(id)) {
        const sendMsg = (msg, opts = {}) => bot.sendMessage(id, msg, opts);

        const ttsArr = splitStrings(text);
        const error = checkForIncorrectMessage(ttsArr);

        if (error) {
            return sendMsg(error);
        }

        for (const tts of ttsArr) {
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
