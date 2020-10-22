/**
 * File: /home/elavanresu/ElavanResu/e-bot/functionHelpers/transformSentence.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 19th 2020, 10:15:33 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Oct 22 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { scandsMapper } = require('../metaData/words')

const transformSentence = (sentence) => {
  let modifiedSentence = sentence
  Object.keys(scandsMapper).forEach(ele => {
    const regexChecker = new RegExp('(' + scandsMapper[ele].replace(/,+/g, '|') + ')', 'g')
    modifiedSentence = modifiedSentence.toLowerCase().replace(regexChecker,ele)
  })
  return modifiedSentence
}

module.exports = transformSentence
