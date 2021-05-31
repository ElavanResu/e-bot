/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/custrec.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 18th 2020, 10:26:14 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const addReactionsHandler = require('../commandHandlers/custrec/addReactionsHandler')
const removeReactionsHandler = require('../commandHandlers/custrec/removeReactionsHandler')
const { globalUsers } = require('../metaData/globalUsers')

module.exports = {
	name: 'custrec',
	description: 'Reaction settings',
	args: true,
  guildOnly: true,
  aliases: ['crec'],
	usage: 'add <mention> <reactions> <>',
	moreInfo: `Reaction settings`,
	cooldown: -1,
	async execute(message, args) {
    // check perms
    if (!globalUsers.hasOwnProperty(message.author.id)) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Sorry, no one is allowed to use the system features`)
      )
    }

    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Invalid Arguments. Type **${prefix} help custrec** to know more.`)
    )

    if (args[0] === 'add') {
      // CHeck mentions
      if (!args[1].startsWith('<@')) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Mention the user`)
      )
      if (!message.mentions.users.first()) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`Mention the user.`)
        )
      }

      // Check reactions
      if (!args[2]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing reactions`)
      )

      // Check reaction words
      if (!args[3]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing reacion words`)
      )

      // Check series of checks
      if (!args[4]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing settings`)
      )

      if (!args[5]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing settings`)
      )

      if (!args[6]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing settings`)
      )

      if (!args[7]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Missing settings`)
      )

      await addReactionsHandler(message, args)
    } else if (args[0] === 'rm') {
       // CHeck mentions
       if (!args[1].startsWith('<@')) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Mention the user`)
      )
      if (!message.mentions.users.first()) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`Mention the user.`)
        )
      }

      await removeReactionsHandler(message, args)
    }
  }
}