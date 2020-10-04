/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/em.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Thursday, October 1st 2020, 11:03:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/hook.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 6:02:46 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const { getEmojiCode } = require('../dbObjects')
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
		message.delete()
		if (!message.channel) return console.log('channel not specified')
    if (!args[0]) return message.channel.send('Emoji not specified')

		// if (!args[0].startsWith('<@')) return console.log('Mention user')
		// if (!args[1]) return console.log('Message not specified')
		// const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
		// const mentionedUser = message.mentions.users.first()
		try {
			const emojiCode = await getEmojiCode(args[0])
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
