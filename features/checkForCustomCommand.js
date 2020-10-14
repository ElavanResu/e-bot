/*
 * File: /home/elavanresu/ElavanResu/e-bot/features/checkForCustomCommand,js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 10:07:07 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: s
 * Modified By: s
 * -----
 * All Rights reserved
 */

const { getCustomMessage } = require('../dbObjects')
const Discord = require('discord.js')

const checkForCustomCommand = async (client, message, commandName) => {
  try {
    // Check for command that already exists
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (command) return

    // Get custom message
    const response = await getCustomMessage(message.guild.id, commandName)
    if (!response) return
    return message.channel.send(response.custom_message)
  } catch (error) {
    console.log('Error in checkForCustomCommand: ', error)
  }
}

module.exports = checkForCustomCommand