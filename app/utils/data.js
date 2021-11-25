'use strict';

/**
 * @param {string} text
 * @returns {string}
 */
const trimText = text => text
    .replaceAll('!', ',')
    .replace(/\n+/g, '. ')
    .replace(/\.+/, '.')
    .replace(/[^\d ,.:=?a-zа-яё-]/gi, ' ')
    .replace(/ +/g, ' ')
    .replaceAll(' .', '.')
    .trim();

module.exports = {trimText};
