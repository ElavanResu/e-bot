/**
 * File: /home/elavanresu/ElavanResu/e-bot/features/captureCustomEmojis.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 2nd 2020, 9:35:25 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 03 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const { addCustomEmoji } = require('../dbObjects')

const captureCustomEmojis = async (messages) => {
  const customEmojis = messages.content.match(/<(:|a:)[\Sa-zA-Z0-9]+:[0-9]+>/g)
  if (customEmojis !== null) {
    console.log('customEmojis: ', customEmojis)
    for (let index = 0; index < customEmojis.length; index++) {
      try {
        const customEmojiSlicedName = customEmojis[index].match(/:[\Sa-zA-Z]+:/g)
        const customEmojiName = customEmojiSlicedName[0].replace(/:/g, '')
        console.log('ele: ', customEmojis[index])
        console.log('name; ', customEmojiName.toLowerCase())
        await addCustomEmoji(customEmojiName.toLowerCase(), customEmojis[index])
      } catch (error) {
        console.log('error in adding emoji: ', error)
      }
    }
  }
}

module.exports=captureCustomEmojis