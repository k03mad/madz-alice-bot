'use strict';

const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const {print} = require('@k03mad/utils');
const {telegram, cloud, cert} = require('../../env');

if (cloud.is) {
    const bot = new TelegramBot(telegram.token, {
        webHook: {
            port: telegram.port,
            key: path.join(cert.path, cloud.domain, 'privkey.pem'),
            cert: path.join(cert.path, cloud.domain, 'fullchain.pem'),
        },
    });

    bot
        .setWebHook(`https://${cloud.domain}:${telegram.port}/bot${telegram.token}`)
        .catch(err => print.ex(err, {
            before: 'setWebHookErr',
            exit: true,
        }));

    module.exports = bot;
} else {
    module.exports = new TelegramBot(telegram.token, {polling: true});
}
