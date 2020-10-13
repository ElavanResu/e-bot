/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/rmvres.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 11th 2020, 12:32:27 am
 * Author: Shubham Navale
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const allowUsersHandler = require('../commandHandlers/res/allowUsersHandler')
const Discord = require('discord.js')

module.exports = {
	name: 'rmvres',
	description: 'Removes user from restriction list',
	args: true,
  guildOnly: true,
  aliases: ['removeres', 'rmvrestrictions'],
	usage: '<mention>',
	moreInfo: `Removes user from restriction list`,
	cooldown: -1,
	async execute(message, args) {
    // Delete message
    message.delete()

    // Check perms
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'modify_restricted_users')) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
    )

    // Check mentions
		if (!message.mentions.users.size) {
      const msgToDelete = message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Dumbo, whom are you trying to allow? You need to mention someone to annoy.')
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    }

    // Check mention format
		if (!args[0].startsWith('<@')) {
      const msgToDelete = message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Dumbo, whom are you trying to allow? You need to mention someone to annoy.')
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)
    }
    await allowUsersHandler(message, message.mentions.users.first(), message.guild.id)
  }
}