/**
 * File: /home/elavanresu/ElavanResu/e-bot/metaData/words.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 19th 2020, 9:15:25 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Oct 22 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const scandsMapper = {
  a: 'æ,ã,å,ā,à,á,â,ä,a',
  b: 'b,ß',
  c: 'ç,c',
  d: 'd',
  e: 'ē,ê,ë,è,é,e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'ì,ï,ī,î,í,i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'ñ,n',
  o: 'õ,ō,ø,œ,ò,ö,ô,ó,o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'ū,ü,ù,û,ú,u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z'
}

const allOwnerWords = [
  'elavan',
  'elavanresu',
  'resu',
  'navale',
  'shubham',
  '234249678328299520'
]

const selectedOwnerWords = [
  'navale',
  'shubham'
]

const badBotData = [
  {
    username: 'MEE6',
    id: '765790362149060649',
    discriminator: '0000',
    words: allOwnerWords
  }
]

module.exports = {
  allOwnerWords,
  selectedOwnerWords,
  scandsMapper,
  badBotData
}
