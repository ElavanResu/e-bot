/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/res/allowUsersHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 11th 2020, 12:24:14 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 11 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { removeMember } = require('../../dbObjects')

const allowUsersHandler = async (message, member, guildId) => {
  try {
    const response = await removeMember(member.id, guildId)
    if (response.status === 'success') {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`**${member.username}** is no longer restricted.`)
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    } else if (response.status === 'notFound') {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`**${member.username}** is not restricted.`)
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    }
  } catch (error) {
    console.log('Error in allowUsersHandler: ', error)
  }
}

module.exports = allowUsersHandler