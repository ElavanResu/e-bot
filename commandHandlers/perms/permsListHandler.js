/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/perms/permsListHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 5:46:52 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getMemberPerms } = require('../../dbObjects')

const permsListHandler = async (message, memberId, guildId) => {
  try {
    if (!message.mentions.users.size) {
      const permsList = await getMemberPerms(memberId, guildId)
      const permsListEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle('Here\'s a list of all the permissions you have:')
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`)

      const allPerms = Object.keys(permsList.dataValues).filter(ele => permsList[ele] && ele !== 'id' && ele !== 'member_id' && ele !== 'guild_id')
      permsListEmbed.setDescription(allPerms)
      return message.channel.send(permsListEmbed)
    }
    const mentionedUser = message.mentions.users.first()
    const permsList = await getMemberPerms(mentionedUser.id, guildId)
    const permsListEmbed = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
      .setTitle(`Here\'s a list of all the permissions ${mentionedUser.username} have:`)
      .setTimestamp()
      .setFooter(`Asked by ${message.author.username}`)

    const allPerms = Object.keys(permsList.dataValues).filter(ele => permsList[ele] && ele !== 'id' && ele !== 'member_id' && ele !== 'guild_id')
    permsListEmbed.setDescription(allPerms)
    return message.channel.send(permsListEmbed)

  } catch (error) {
    console.log('Error in permsListHandler: ', error)
  }
}

module.exports = permsListHandler