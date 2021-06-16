/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/ping.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, May 31st 2021, 10:04:29 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { guestGlobalusers } = require('../metaData/globalUsers')
const { prefix } = require('../config.json')

module.exports = {
	name: 'ping',
	description: 'Pings people for x number of times',
	args: true,
  guildOnly: true,
  aliases: ['pingme', 'pm'],
	usage: '<times> <tag>',
	moreInfo: `Pings people x number of times`,
	cooldown: -1,
  async execute(message, args) {
    // check perms
    if (!guestGlobalusers.hasOwnProperty(message.author.id)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Sorry, no one is allowed to use the system features`)
      )
    }

    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Invalid Arguments. Type **${prefix} help ping** to know more.`)
    )

    if (typeof parseInt(args[0]) !== 'number' || parseInt(args[0]) === 0 || isNaN(parseInt(args[0]))) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Invalid Arguments. Type **${prefix} help ping** to know more.`)
    )

    const taggedUser = message.mentions.users.first()

    if (typeof parseInt(args[0]) === 'number') {
      const times = parseInt(args[0])
      for (let count = 0; count < times; count++) {
        if (args[1] === 's') {
          await message.channel.send(`${taggedUser || message.author}`)
        } else if (!taggedUser) {
          await message.author.send(`${message.author}`)
        } else {
          await taggedUser.send(`${message.author}`)
        }
      }
      return
    }
  }
}