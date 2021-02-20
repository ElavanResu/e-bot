/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/re/reactMessageHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 1:58:29 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Feb 20 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const {
  getCustomEmojiNameDetails,
  getEmojiCode
} = require('../../dbObjects')

const reactMessageHandler = async (message, messageId, customEmoji) => {
  try {
    const messageToReact = await message.channel.messages.fetch(messageId)
    const response = await getCustomEmojiNameDetails(message.author.id, customEmoji)
    let emojiCode
    if (response.status === 'success') {
      emojiCode = await getEmojiCode(response.data.emoji_name)
    } else {
      emojiCode = await getEmojiCode(customEmoji)
    }
    const regEmojiCodeFilter = new RegExp(/\d{18}/)
    await messageToReact.react(regEmojiCodeFilter.exec(emojiCode.emojiCode)[0])
  } catch (error) {
    console.log('Error in reactMessageHandler: ', error)
  }
}

module.exports = reactMessageHandler