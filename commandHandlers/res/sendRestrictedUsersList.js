/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/res/sendRestrictedUsersList.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 11th 2020, 1:54:39 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 11 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getAllMembers } = require('../../dbObjects')

const sendRestrictedUsersList = async (message) => {
  try {
    const response = await getAllMembers(message.guild.id)
    const sendInfoMessage = await message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`I've sent you DM with the list`)
    )
    setTimeout(() => {
      sendInfoMessage.delete()
    }, 6000)
    if (response.length === 0) {
      const emptyRestrictedList = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
      .setTitle(`No users are restricted in **${message.guild.name}**`)
      .setTimestamp()
      return message.author.send(emptyRestrictedList)
    }
    const restrictedList = new Discord.MessageEmbed()
    .setColor('#3EFEFF')
    .setTitle(`Here\'s a list of all the restricted users in **${message.guild.name}**:`)
    .setTimestamp()

    const cmdList = response.map(ele => message.guild.member(ele.dataValues.member_id))
    restrictedList.setDescription(cmdList)
    return message.author.send(restrictedList)
  } catch (error) {
    console.log('Error in sendRestrictedUsersList: ', error)
  }
}

module.exports = sendRestrictedUsersList