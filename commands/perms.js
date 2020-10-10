/*
 * File: /home/elavanresu/ElavanResu/e-bot/commands/perms
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 5:41:39 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: s
 * Modified By: s
 * -----
 * All Rights reserved
 */

const Discord = require('discord.js')
const permsListHandler = require('../commandHandlers/perms/permsListHandler')
const setPermsHandler = require('../commandHandlers/perms/setPermsHandler')

module.exports = {
	name: 'perms',
	description: 'Check permissions',
	args: true,
  guildOnly: true,
  aliases: ['permissions'],
	usage: '<list> or <set> <mention> <perm type> <perm value>',
	moreInfo: `Check permissions`,
  cooldown: -1,
  async execute(message, args) {
    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Missing arguments`)
    )

    if (args[0] === 'list') {
      await permsListHandler(message, message.author.id, message.guild.id)
    } else if (args[0] === 'set') {
      if (!globalUsers.hasOwnProperty(message.author.id)) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
        )
      }

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
      await setPermsHandler(message, message.mentions.users.first(), args[2], args[3])
    }
  }
}





