'use strict';

const MIN_MESSAGE_LEN = 3;
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

module.exports = {trimText, MIN_MESSAGE_LEN, MAX_MESSAGE_LEN};
