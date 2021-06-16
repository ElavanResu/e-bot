/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/cc.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 10:57:26 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')
const addCustomCommandHandler = require('../commandHandlers/cm/addCustomCommandHandler')
const listHandler = require('../commandHandlers/cm/listHandler')
const removeCustomCommandHandler = require('../commandHandlers/cm/removeCustomCommandHandler')
const { globalUsers } = require('../metaData/globalUsers')
const { allOwnerWords } = require('../metaData/words')

const regexCheck = new RegExp(allOwnerWords.toString().replace(/,+/g, '|'), 'g')

module.exports = {
	name: 'cc',
	description: 'Sets custom command',
	args: true,
  guildOnly: true,
  aliases: ['customcommand', 'custom'],
	usage: '<list> || <set|rm> <custom command> <message>',
	moreInfo: `Sets custom command`,
	cooldown: -1,
	async execute(message, args, { client }) {
    // Check for perms
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'set_custom_commands')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }

    // Check for action
    if (!args[0]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Specify the action`)
    )

    if (args[0] === 'set') {
      // Check for custom command
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Custom command not specified`)
      )
      if(args[1].toLowerCase().match(regexCheck) && !globalUsers.hasOwnProperty(message.author.id)) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`You are not allowed to use my master's name.`)
      )

      // Check for custom message
      if (args[2] === undefined) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Message not provided.`)
      )
      const customMessage = args.splice(2, args.length - 1).toString().replace(/[, ]+/g, ' ')
      await addCustomCommandHandler(message, client, args[1], customMessage)
    } else if (args[0] === 'rm') {
      // Check for custom command
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Custom command not specified`)
      )
      await removeCustomCommandHandler(message, args[1])
    } else if (args[0] === 'list') {
      await listHandler(message)
    }
  }
}