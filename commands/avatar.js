/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/avatar.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, May 21st 2020, 8:22:06 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const Discord = require('discord.js')

module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	usage: '<mention users (optional)>',
	description: 'Shows the avatar of the mentioned user. If no user is mentioned, then the avatar of author displayed',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) {
			const embed = new Discord.MessageEmbed()
				.setColor('#3EFEFF')
				.setTitle('Your profile pic')
				.setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
				.setTimestamp()
				.setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)

			return message.channel.send(embed)
		}

		message.mentions.users.map(user => {
			message.channel.send({ embed: {
				color: 0x3EFEFF,
				title: `${user.username}'s profile pic`,
				image: {
					url: `${user.displayAvatarURL({ format: 'png', dynamic: true })}`,
				},
				timestamp: new Date(),
				footer: {
					text: `${message.author.username}`,
					icon_url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
				},
			} })
		})
	}
}
