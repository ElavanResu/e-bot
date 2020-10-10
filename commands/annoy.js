/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/annoy.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Saturday, May 23rd 2020, 11:12:38 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 06 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'annoy',
	description: 'Sends private messages to annoy mentioned user, with or without custom message',
	cooldown: 15,
	usage: '<mention user> <message (optional)>',
	args: true,
	guildOnly: true,
	async execute(message, args) {
		// Check perms
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'annoy')) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
		)

		// Delete message
		message.delete()

		// Check mentions
		if (!message.mentions.users.size) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.')
		)

		// Check mention format
		if (!args[0].startsWith('<@')) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.')
		)

		// Send default message if no message is provided
		if (args[1] === undefined) {
			message.mentions.users.map(user => {
				user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`)
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`), 1500)
				}
			})

		// Send user defined message
		} else {
			const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
			message.mentions.users.map(user => {
				user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``)
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``), 1500)
				}
			})

			// Capture the instance of error message to delete
			const messageToDelete = await message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#3EFEFF')
					.setDescription(`Message sent, this message will get deleted in 10 seconds.`)
			)

			// Delete the error message after 10 seconds
			setTimeout(() => {
				messageToDelete.delete()
			}, 10000)
			return
		}
	}
}
