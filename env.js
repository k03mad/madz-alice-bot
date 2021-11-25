'use strict';

module.exports = {
    telegram: {
        allowedChats: [
            Number(process.env.TELEGRAM_MY_CHAT),
            Number(process.env.TELEGRAM_KNPL_CHAT),
        ],
        token: process.env.TELEGRAM_ALICE_BOT,
        port: process.env.TELEGRAM_ALICE_PORT,
    },
    cloud: {
        is: process.env.IS_CLOUD,
        domain: process.env.CLOUD_DOMAIN,
    },
    cert: {
        path: process.env.CERT_PATH,
    },
};
