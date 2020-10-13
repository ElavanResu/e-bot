/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/checkAllHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 12:23:20 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getEmojiList } = require('../../dbObjects')
const Discord = require('discord.js')

const checkAllHandler = async (message) => {
  try {
    const emojiList = await getEmojiList()
    console.log('gotototo', JSON.stringify(emojiList))
    // emojiList.forEach(ele => {
    //   message.channel.send(ele.emoji_global_code)
    // })
    for (let count = 0; count < emojiList.length; count++) {
      await message.channel.send(`dev e ${emojiList[count].emoji_name} s`)
    }
    return null
  } catch (error) {
    console.log('Error in checkAllHandler: ', error)
  }
}

module.exports = checkAllHandler
