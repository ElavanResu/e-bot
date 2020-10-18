/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/custrec/addReactionsHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 18th 2020, 11:04:28 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 19 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { addReactionsDetails } = require('../../dbObjects')

const addReactionsHandler = async (message, args) => {
  try {
    const mentionedUser = message.mentions.users.first()
    const response = await addReactionsDetails(
      mentionedUser.id,
      message.guild.id,
      {
        reactions: args[2],
        checkWords: args[3] === 'null' ? '' : args[3],
        evadeBot: args[4],
        belowElavan: args[5],
        showOnMention: args[6],
        everytime: args[7]
      }
    )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`Details added`)
    )
  } catch (error) {
    console.log('Error in addReactionsHandler: ', error)
  }
}

module.exports = addReactionsHandler