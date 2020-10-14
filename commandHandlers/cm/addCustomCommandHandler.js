/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/cm/addCustomCommandHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 11:06:15 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { addCustomCommand } = require('../../dbObjects')
const Discord = require('discord.js')

const addCustomCommandHandler = async (message, client, customCommand, customMessage) => {
  try {
    const command = client.commands.get(customCommand) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(customCommand))
    if (command) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`**${customCommand}** cannot be used as a custom command, use something else`)
    )
    const response = await addCustomCommand(message.guild.id, customCommand, customMessage)
    if (!response) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Error in setting up the custom command`)
    )
    if (response.status === 'success') return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(response.message)
    )
  } catch (error) {
    console.log('Error in addCustomCommand: ', error)
  }
}

module.exports = addCustomCommandHandler
