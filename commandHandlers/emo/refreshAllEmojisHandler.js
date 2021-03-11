/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/refreshAllEmojisHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, March 12th 2021, 12:38:38 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Mar 12 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getEmojiCode } = require('../../dbObjects')
const addEmojiCodeManuallyHelper = require('./addEmojiCodeManuallyHelper')
const Discord = require('discord.js')

const refreshAllEmojisHandler = async (message, emojiName, emojiCode, animate) => {
  try {
    // TODO 1: Get all server emojis
    let serverEmojis = JSON.stringify(message.guild.emojis.cache)
    serverEmojis = JSON.parse(serverEmojis)

    // TODO 2: Check the existance in the DB and get the list of new emojis
    for (let count = 0; count < serverEmojis.length; count++) {
      const response = await getEmojiCode(serverEmojis[count].name)
      if (response === null) {
        // TODO 3: Add the new emojis in the DB
        await addEmojiCodeManuallyHelper(message, serverEmojis[count].name, serverEmojis[count].id, serverEmojis[count].animated)
      }
    }
  } catch (error) {
    console.log('Error in refreshAllEmojisHandler: ', error)
  }
}

module.exports = refreshAllEmojisHandler
