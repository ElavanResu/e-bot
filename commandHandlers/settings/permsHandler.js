/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/settings/permsHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 4:55:21 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { updatePermission } = require('../../dbObjects')
const Discord = require('discord.js')

const permsHandler = async (message, user, permType, permValue) => {
  try {
    const response = await updatePermission(user.id, message.guild.id, permType, permValue)
    if (response.status !== 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${response.message}`)
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`${response.message}`)
    )
  } catch (error) {
    console.log('error in permsHandler: ', error)
  }
}

module.exports = permsHandler