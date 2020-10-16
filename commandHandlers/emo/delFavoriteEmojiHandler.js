/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/delFavoriteEmojiHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 17th 2020, 2:29:54 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 17 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { delFavoriteEmoji } = require('../../dbObjects')
const Discord = require('discord.js')

const delFavoriteEmojiHandler = async (message, memberId, emojiName) => {
  try {
    const response = await delFavoriteEmoji(memberId, emojiName)
    if (response.status !== 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${response.message}`)
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`**${emojiName}** deleted from your favorite list.`)
    )
  } catch (error) {
    console.log('Error in delFavoriteEmojiHandler: ', error)
  }
}

module.exports = delFavoriteEmojiHandler