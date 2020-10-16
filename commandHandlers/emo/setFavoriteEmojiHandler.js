/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/setFavoriteEmojiHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 17th 2020, 2:16:56 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 17 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { addFavoriteEmoji } = require('../../dbObjects')
const Discord = require('discord.js')

const setFavoriteEmojiHandler = async (message, memberId, emojiName) => {
  try {
    const response = await addFavoriteEmoji(memberId, emojiName)
    if (response.status !== 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${response.message}`)
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`**${emojiName}** added to favorites`)
    )
  } catch (error) {
    console.log('Error in setFavoriteEmojiHandler: ', error)
  }
}

module.exports = setFavoriteEmojiHandler
