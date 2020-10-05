/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/addEmojiCodeManuallyHelper.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 6th 2020, 3:04:54 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 06 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { addCustomEmoji } = require('../../dbObjects')
const Discord = require('discord.js')

const addEmojiCodeManuallyHelper = async (message, emojiName, emojiCode, animate) => {
  try {
    const wholeEmojiCode = `<${(animate) ? 'a' : ''}:${emojiName}:${emojiCode}>`
    await addCustomEmoji(emojiName.toLowerCase(), wholeEmojiCode)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`**${emojiName}** added to the database, checkdatabase to confirm.`)
    )
  } catch (error) {
    console.log('Error in addEmojiCodeManuallyHelper: ', error)
  }
}

module.exports = addEmojiCodeManuallyHelper
