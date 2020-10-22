/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/re.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 21st 2020, 9:19:01 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 21 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')

module.exports = {
	name: 're',
	description: 'React to messages',
	args: true,
  guildOnly: true,
  aliases: ['react'],
	usage: '<message id> <react emoji>',
	moreInfo: `React to messages`,
	cooldown: -1,
	async execute(message, args) {
    // Check perms
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'react_emojis')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }

    // Check message id
    if (!args[0]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Message Id not specified`)
    )

    if (parseInt(args[0]) === NaN || (args[0].toString().length !== 18)) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Invalid message Id`)
    )

    if (!args[0]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Message Id not specified`)
    )

    // Check emoji
    if (!args[1]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Emoji not specified`)
    )

    message.delete()
  }
}