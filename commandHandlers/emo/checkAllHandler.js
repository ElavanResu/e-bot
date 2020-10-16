/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/checkAllHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 12:23:20 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Oct 16 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getEmojiList } = require('../../dbObjects')
const Discord = require('discord.js')
const config = require('../../config.json')

const timer = (ms) => {
  return new Promise(res => setTimeout(res, ms))
}

const checkAllHandler = async (message) => {
  try {
    const emojiList = await getEmojiList()
    console.log('gotototo', JSON.stringify(emojiList))
    // emojiList.forEach(ele => {
    //   message.channel.send(ele.emoji_global_code)
    // })
    for (let count = 0; count < emojiList.length; count++) {
      await timer(1500)
      await message.channel.send(`${config.prefix}e ${emojiList[count].emoji_name} s`)
    }
    return null
  } catch (error) {
    console.log('Error in checkAllHandler: ', error)
  }
}

module.exports = checkAllHandler
