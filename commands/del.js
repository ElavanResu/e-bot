/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/del.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 24th 2020, 1:00:19 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { globalUsers } = require('../metaData/globalUsers')

module.exports = {
	name: 'del',
	description: 'Deletes message by id',
	args: true,
  guildOnly: true,
  aliases: [''],
	usage: '<message_id>',
	moreInfo: `Deletes message by id`,
  cooldown: -1,
  async execute(message, args, { musicQueue, queue }) {
    // Permissions
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
				.setDescription(`Message Id missing`)
    )

    if (parseInt(args[0]) === NaN || (args[0].toString().length !== 18)) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Invalid message Id`)
    )

    message.delete()

    const messageToDelete = await message.channel.messages.fetch(args[0])

    messageToDelete.delete()
  }
}