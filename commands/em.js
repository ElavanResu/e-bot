/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/em.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Thursday, October 1st 2020, 11:03:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Oct 16 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const getEmojiCodeHandler = require('../commandHandlers/em/getEmojiCodeHandler')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'em',
	description: 'Puts emoji',
	args: true,
  guildOnly: true,
  aliases: ['emote', 'emoji', 'e'],
	usage: '<emojiName>',
	moreInfo: `Emoji list:`,
	cooldown: -1,
	async execute(message, args) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'custom_emojis')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		if (!message.channel) return console.log('channel not specified')
		if (!args[0]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Emoji not specified`)
		)

		if (args[1] !== 's') {
			message.delete()
		}

		// if (!args[0].startsWith('<@')) return console.log('Mention user')
		// if (!args[1]) return console.log('Message not specified')
		// const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
		// const mentionedUser = message.mentions.users.first()
		try {
			const emojiCode = await getEmojiCodeHandler(message, args[0])
			if (!emojiCode) {
				const messageToDelete = await message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#A6011F')
						.setDescription(`**${args[0]}** is not an invalid emoji name. This message will get deleted in 6 seconds.`)
				)
				setTimeout(() => {
					messageToDelete.delete()
				}, 6000)
				return
			}
			message.channel.fetchWebhooks()
			.then(webhook => {
				let foundHook
				webhook.forEach(ele => {
					if (ele.name === 'SimonHook') foundHook = ele
				})
				if (!foundHook) {
					message.channel.createWebhook('SimonHook')
						.then(newWebhook => {
							newWebhook.send(emojiCode, {
								'username': message.author.username,
								'avatarURL': `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
							})
						})
						.catch (error => {
							console.log('error: ', error)
							return message.channel.send('Error, check console')
						})
				}
				else {
					foundHook.send(emojiCode, {
						'username': message.author.username,
						'avatarURL': `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
						// 'embeds': [{
						// 	// 'color': parseInt(`0x${color}`),
						// 	'description': message,
						// }]

					})
						.catch(error => {
							console.log('error: ', error)
							return console.log('Incorrect emoji or internal error')
						})
				}
			})
		} catch {
			console.log('error in fetching emoji code: ', error)
		}
	}
}
