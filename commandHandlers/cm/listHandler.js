/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/cm/listHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 11:53:09 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Oct 15 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getAllCommands } = require('../../dbObjects')
const Discord = require('discord.js')

const listHandler = async (message) => {
  try {
    const response = await getAllCommands(message.guild.id)
    if (response.length === 0) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`There are no custom commands added in this server`)
    )
    const customMessageListEmbed = new Discord.MessageEmbed()
    .setColor('#3EFEFF')
    .setTitle('Here\'s a list of all the custom commands:')
    .setTimestamp()
    .setFooter(`Asked by ${message.author.username}`)

    const customCommandList = response.map(ele => ele.custom_command)
    customMessageListEmbed.setDescription(customCommandList)
    return message.channel.send(customMessageListEmbed)
  } catch (error) {
    console.log('error in fetching custom commands list:  ', error)
  }
}

module.exports = listHandler