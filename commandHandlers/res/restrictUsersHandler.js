/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/res/restrictUsersHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 11th 2020, 12:04:32 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 11 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { addMember } = require('../../dbObjects')

const restrictUsersHandler = async (message, member, guildId) => {
  try {
    const response = await addMember(member.id, guildId)
    if (response.status === 'success') {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`**${member.username}** is now restricted.`)
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    } else if (response.status === 'exists') {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`**${member.username}** is already restricted.`)
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    }
  } catch (error) {
    console.log('Error in restrictedUsersHandler: ', error)
  }
}

module.exports = restrictUsersHandler