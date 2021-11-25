'use strict';

const MAX_MESSAGE_LEN = 100;

/**
 * @param {string} text
 * @returns {string}
 */
const trimText = text => text
    .replace(/\n+/g, '. ')
    .replace(/[^ ,.:=?a-zа-яё-]/gi, ' ')
    .replace(/ +/g, ' ')
    .trim();

module.exports = {trimText, MAX_MESSAGE_LEN};
