/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/delCustomNameHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 11:13:57 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { delCustomEmojiName } = require('../../dbObjects')
const Discord = require('discord.js')

const delCustomNameHandler = async (message, memberId, customName) => {
  try {
    const response = await delCustomEmojiName(memberId, customName)
    if (response.status !== 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${response.message}`)
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`**${customName}** deleted from your custom list.`)
    )
  } catch (error) {
    console.log('Error in delCustomNameHandler: ', error)
  }
}

module.exports = delCustomNameHandler