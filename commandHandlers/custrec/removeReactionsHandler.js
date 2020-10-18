/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/custrec/removeReactionsHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 19th 2020, 2:27:33 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 19 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { removeReactionsDetails } = require('../../dbObjects')

const removeReactionsHandler = async (message, args) => {
  try {
    const mentionedUser = message.mentions.users.first()
    const response = await removeReactionsDetails(
      mentionedUser.id,
      message.guild.id
    )
    if (response.status === 'success') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(response.message)
      )
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(response.message)
    )
  } catch (error) {
    console.log('Error in removeReactionsHandler: ', error)
  }
}

module.exports = removeReactionsHandler