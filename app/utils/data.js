'use strict';

const {MAX_LINES_TEXT, MAX_MESSAGE_LEN} = require('./const');

/**
 * @param {string} text
 * @returns {string}
 */
const trimText = text => text
    // восклицательный знак вырежется — заменяем точкой
    .replaceAll('!', '.')
    // оставляем только символы, которые можно передать в апи
    .replace(/[^\d ,.:=?a-zа-яё-]/gi, ' ')
    // несколько одинаковых символов подряд
    .replace(/,+/g, ',')
    .replace(/\.+/g, '.')
    .replace(/:+/g, ':')
    .replace(/=+/g, '=')
    .replace(/\?+/g, '?')
    .replace(/-+/g, '-')
    .replace(/ +/g, ' ')
    .trim();

/**
 * @param {string} text
 * @returns {Array<string>}
 */
const splitStrings = text => text
    .split('\n')
    .map(elem => trimText(elem))
    .filter(elem => elem.match(/[a-zа-яё]{2}/i));

/**
 * @param {string} msg
 * @returns {undefined|string}
 */
const checkForIncorrectMessage = msg => {
    if (msg.length === 0) {
        return 'В сообщении должно быть хотя бы 2 буквы';
    }

    if (msg.length > MAX_LINES_TEXT) {
        return `В сообщении слишком много строк: ${msg.length}\nМаксимум строк: ${MAX_LINES_TEXT}`;
    }

    const aboveMax = msg.filter(elem => elem.length > MAX_MESSAGE_LEN);

    if (aboveMax.length > 0) {
        return `Одна из строк сообщения слишком длинная: ${aboveMax[0].length}\nМаксимум символов в строке: ${MAX_MESSAGE_LEN}`;
    }
};

module.exports = {checkForIncorrectMessage, splitStrings};
