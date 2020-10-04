/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/settings.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 4:46:01 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const globalUsers = require('../metaData/globalUsers')
const permsHandler = require('../commandHandlers/settings/permsHandler')
const Discord = require('discord.js')

module.exports = {
	name: 'settings',
	description: 'Bot settings',
	args: true,
  guildOnly: true,
  aliases: ['set'],
	usage: 'perms <user> <perm type> <perm value>',
	moreInfo: `Bot settings`,
  cooldown: -1,
  async execute(message, args) {
    if (!globalUsers.hasOwnProperty(message.author.id)) {
      return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }

    if (args[0] == 'perms') {
      if (!args[1].startsWith('<@')) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Mention the user`)
      )
      if (!message.mentions.users.first()) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`Mention the user. If you have already mentioning user, then make sure it's not a self mention`)
        )
      }
      if (!args[2]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('perm type not specified')
      )
      if (!args[3]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('perm value not specified')
      )
      await permsHandler(message, message.mentions.users.first(), args[2], args[3])
    }
  }
}