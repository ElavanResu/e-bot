/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/cm/removeCustomCommandHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 11:44:11 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { removeCustomCommand } = require('../../dbObjects')
const Discord = require('discord.js')

const removeCustomCommandHandler = async (message, customCommand) => {
  try {
    const response = await removeCustomCommand(message.guild.id, customCommand)
    if (response.status === 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`Custom command **${customCommand}** removed`)
    )
    if (response.status === 'failed') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(response.message)
    )
  } catch (error) {
    console.log('Error in removeCustomCommandHandler: ', error)
  }
}

module.exports = removeCustomCommandHandler