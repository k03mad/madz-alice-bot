'use strict';

/**
 * @param {string} text
 * @returns {string}
 */
const trimText = text => text
    .replace(/\n+/g, '. ')
    .replace(/[^ ,.:=?a-zа-яё-]/gi, ' ')
    .replace(/ +/g, ' ')
    .trim();

module.exports = {trimText};
