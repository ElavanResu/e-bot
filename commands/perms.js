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

module.exports = {
	name: 'perms',
	description: 'Check permissions',
	args: true,
  guildOnly: true,
  aliases: ['permissions'],
	usage: '<list>',
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
    }
  }
}





