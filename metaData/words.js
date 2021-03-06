/**
 * File: /home/elavanresu/ElavanResu/e-bot/metaData/words.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 19th 2020, 9:15:25 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Feb 20 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const scandsMapper = {
  a: 'a,á,à,â,ǎ,ă,ã,ả,ȧ,ạ,ä,å,ḁ,ā,ą,ᶏ,ⱥ,ấ,ầ,ẫ,ẩ,ậ,ắ,ằ,ẵ,ẳ,ặ,ǻ,ǡ,ǟ,ȁ,ȃ,ɑ,ᴀ,ɐ,ɒ,ａ,æ,ᴁ,ᴭ,ᵆ,ǽ,ǣ,ᴂ',
  b: 'b,ß,ḃ,ḅ,ḇ,ƀ,ɓ,ƃ,ᵬ,ᶀ,ʙ,ｂ,ȸ',
  c: 'ć,ĉ,č,ċ,c,̄,ç,ḉ,ȼ,ƈ,ɕ,ᴄ,ｃ',
  d: 'ď,ḋ,ḑ,ḍ,ḓ,ḏ,đ,ð,̦,ɖ,ɗ,ƌ,ᵭ,ᶁ,ᶑ,ȡ,ᴅ,ｄ,þ,ȸ,z,ǳ,d,ž,ǆ',
  e: 'e,é,è,ê,ḙ,ě,ĕ,ẽ,ḛ,ẻ,ė,ë,ē,ȩ,ę,ᶒ,ɇ,ȅ,ế,ề,ễ,ể,ḝ,ḗ,ḕ,ȇ,ẹ,ệ,ⱸ,ᴇ,ə,ǝ,ɛ,ｅ,ᴂ,ᴔ,æ,ᴁ,ᴭ,ᵆ,ǽ,ǣ,œ,ᵫ',
  f: 'f,ḟ,ƒ,ᵮ,ᶂ,ꜰ,ｆ,ﬀ,ﬁ,ﬂ',
  g: 'g,ǵ,ğ,ĝ,ǧ,ġ,ģ,ḡ,ǥ,ɠ,ᶃ,ɢ,ȝ,ｇ,ŋ',
  h: 'ĥ,ȟ,ḧ,ḣ,ḩ,ḥ,ḫ,h,̱,ẖ,ħ,ⱨ,ɦ,ʰ,ʜ,ｈ',
  i: 'í,ì,ĭ,î,ǐ,ï,ḯ,ĩ,į,ī,ỉ,ȉ,ȋ,ị,ḭ,ɨ,ᵻ,ᶖ,̇,ı,ɪ,ɩ,ｉ,ﬁ,i,j,ĳ',
  j: 'ĵ,ɉ,̌,ǰ,ȷ,ʝ,ɟ,ʄ,ᴊ,ｊ,i,ĳ,l,ǉ,n,j,ǌ',
  k: 'k,ḱ,ǩ,ķ,ḳ,ḵ,ƙ,ⱪ,ᶄ,ꝁ,ᴋ,ｋ',
  l: 'ĺ,ľ,ļ,ḷ,ḹ,ḽ,ḻ,ł,ŀ,ƚ,ⱡ,ɫ,ɬ,ᶅ,ɭ,ȴ,ʟ,ｌ,ﬂ,l,j,ǉ',
  m: 'm,ḿ,ṁ,ṃ,ᵯ,ᶆ,ɱ,ᴍ,ｍ',
  n: 'ń,ǹ,ň,ñ,ṅ,ņ,ṇ,ṋ,ṉ,̈,ɲ,ƞ,ᵰ,ᶇ,ɳ,ȵ,ɴ,ｎ,ŋ,n,j,ǌ',
  o: 'o,ó,ò,ŏ,ô,ố,ồ,ỗ,ổ,ǒ,ö,ȫ,ő,õ,ṍ,ṏ,ȭ,ȯ,ȱ,ø,ǿ,ǫ,ǭ,ō,ṓ,ṑ,ỏ,ȍ,ȏ,ơ,ớ,ờ,ỡ,ở,ợ,ọ,ộ,ɵ,ɔ,ȣ,ⱺ,ᴏ,ｏ,œ,ᴔ',
  p: 'ṕ,ṗ,ᵽ,ƥ,p,̃,ᵱ,ᶈ,ᴘ,ƿ,ｐ,ȹ',
  q: 'q,ɋ,ƣ,ʠ,ｑ,ȹ',
  r: 'r,ŕ,ř,ṙ,ŗ,ȑ,ȓ,ṛ,ṝ,ṟ,ɍ,ɽ,ꝛ,ᵲ,ᶉ,ɼ,ɾ,ᵳ,ʀ,ｒ',
  s: 'ſ,ß,ś,ṥ,ŝ,š,ṧ,ṡ,ẛ,ş,ṣ,ṩ,ș,s,̩,ᵴ,ᶊ,ʂ,ȿ,ꜱ,ʃ,ｓ',
  t: 'ť,ṫ,ţ,ṭ,ț,ṱ,ṯ,ŧ,ⱦ,ƭ,ʈ,t,̈,ẗ,ᵵ,ƫ,ȶ,ᶙ,ᴛ,ｔ',
  u: 'u,ú,ù,ŭ,û,ǔ,ů,ü,ǘ,ǜ,ǚ,ǖ,ű,ũ,ṹ,ų,ū,ṻ,ủ,ȕ,ȗ,ư,ứ,ừ,ữ,ử,ự,ụ,ṳ,ṷ,ṵ,ʉ,ʊ,ȣ,ᵾ,ᶙ,ᴜ,ｕ,ᵫ',
  v: 'v,ṽ,ṿ,ʋ,ᶌ,ⱱ,ⱴ,ᴠ,ʌ,ｖ',
  w: 'w,ẃ,ẁ,ŵ,ẅ,ẇ,ẉ,ẘ,ⱳ,ᴡ,ｗ',
  x: 'x,ẍ,ẋ,ᶍ,ｘ',
  y: 'y,ý,ỳ,ŷ,ẙ,ÿ,ỹ,ẏ,ȳ,ỷ,ỵ,ɏ,ƴ,ʏ,ｙ',
  z: 'z,ź,ẑ,ż,ẓ,ẕ,ƶ,ȥ,ⱬ,ᵶ,ᶎ,ʐ,ʑ,ɀ,ᴢ,ʒ,ƹ,ｚ,ǳ,ž,ǆ'
}

const allOwnerWords = [
  'elavan',
  'elavanresu',
  'resu',
  'navale',
  'shubham',
  '234249678328299520'
]

const selectedOwnerWords = []

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
