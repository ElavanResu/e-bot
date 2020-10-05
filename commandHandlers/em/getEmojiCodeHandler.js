/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/em/getEmojiCodeHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 10:16:44 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 05 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const {
  getEmojiCode,
  getCustomEmojiNameDetails
} = require('../../dbObjects')

const getEmojiCodeHandler = async (message, usersEmojiInput) => {
  try {
    const response = await getCustomEmojiNameDetails(message.author.id, usersEmojiInput)
    if (response.status === 'success') {
      return await getEmojiCode(response.data.emoji_name)
    }
    return await getEmojiCode(usersEmojiInput)
  } catch (error) {
    console.log('Error in getEmojiCodeHandler: ', error)
  }
}

module.exports = getEmojiCodeHandler