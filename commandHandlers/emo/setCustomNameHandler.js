/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/setCustomNameHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 8:08:42 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { addCustomEmojiName } = require('../../dbObjects')
const Discord = require('discord.js')

const setCustomNameHandler = async (message, memberId, customName, emojiName) => {
  try {
    const response = await addCustomEmojiName(memberId, customName, emojiName)
    if (response.status !== 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${response.message}`)
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`**${customName}** assigned to **${emojiName}**`)
    )
  } catch (error) {
    console.log('Error in setCustomNameHandler: ', error)
  }
}

module.exports = setCustomNameHandler
