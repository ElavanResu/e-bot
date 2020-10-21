/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/hook.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 6:02:46 pm
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
	name: 'hook',
	description: 'Hooks',
	args: true,
	guildOnly: true,
	async execute(message, args) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'hook')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		message.delete()
		if (!message.channel) return console.log('channel not specified')
		if (!args[0]) return console.log('Title not specified')
		if (!args[0].startsWith('<@')) return console.log('Mention user')
		if (!args[1]) return console.log('Message not specified')
		const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
		const mentionedUser = message.mentions.users.first()
		const impersonatedName = await message.guild.members.fetch({ user: mentionedUser, force: true })
		message.channel.fetchWebhooks()
			.then(webhook => {
				let foundHook
				webhook.forEach(ele => {
					if (ele.name === 'SimonHook') foundHook = ele
				})
				console.log('Then1: ', foundHook)
				if (!foundHook) {
					message.channel.createWebhook('SimonHook')
						.then(newWebhook => {
							newWebhook.send(`${msg}`, {
								'username': impersonatedName.displayName,
								'avatarURL': `${mentionedUser.displayAvatarURL({ format: 'png', dynamic: true })}`,
							// 'embeds': [{
							// 	'color': parseInt(`0x${color}`),
							// 	'description': message,
							// }]
							})
						})
						.catch (error => {
							console.log('error: ', error)
							return message.channel.send('Error, check console')
						})
				}
				else {
					foundHook.send(`${msg}`, {
						'username': impersonatedName.displayName,
						'avatarURL': `${mentionedUser.displayAvatarURL({ format: 'png', dynamic: true })}`,
						// 'embeds': [{
						// 	// 'color': parseInt(`0x${color}`),
						// 	'description': message,
						// }]

					})
						.catch(error => {
							console.log('error: ', error)
							return message.channel.send('error, check console')
						})
				}
			})
	}
}
