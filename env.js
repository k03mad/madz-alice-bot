'use strict';

module.exports = {
    telegram: {
        allowedChats: [
            Number(process.env.TELEGRAM_MY_CHAT),
            Number(process.env.TELEGRAM_KNPL_CHAT),
        ],
        token: process.env.TELEGRAM_ALICE_BOT,
    },
};
