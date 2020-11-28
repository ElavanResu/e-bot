/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/re/reactMessageHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 1:58:29 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Oct 23 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')

const reactMessageHandler = async (message, messageId, customEmoji) => {
  try {
    await message.react('768837311407587358')
  } catch (error) {
    console.log('Error in reactMessageHandler: ', error)
  }
}

module.exports = reactMessageHandler