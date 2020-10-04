/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/connectlom.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 4th 2020, 12:51:45 am
 * Author: Shubham Navale
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const Discord = require('discord.js')

module.exports = {
	name: 'connectlom',
	description: 'Connects to ElavanResu\'s server',
	guildOnly: true,
	execute(message, args) {
		if (message.author.id !== '234249678328299520') return message.channel.send('You\'re not allowed to use this command.')

		console.log('connected tolom')
		const hook = new Discord.WebhookClient(`${process.env.HOOKID}`, `${process.env.HOOKTOKEN}`)

		hook.send({
			username: 'logs',
			avatarUrl: 'https://i.imgur.com/5Dctm5N.jpg',
			content: 'content',
			embeds: [
				{
					author: {
						name: 'Birdie',
						url: 'https://www.reddit.com/r/cats/',
						icon_url: 'https://i.imgur.com/R66g1Pe.jpg',
					},
					title: 'title',
					url: 'https://google.com',
					description: 'This logs are going.',
					color: 0x3EFEFF,
					fields: [
						{
							name: 'Text',
							value: 'More text',
							inline: true,
						},
						{
							name: 'Even more text',
							value: 'Yup',
							inline: true,
						},
						{
							name: 'Use `\'inline\': true` parameter, if you want to display fields in the same line.',
							value: 'okay...',
						},
						{
							name: 'Thanks!',
							value: 'You\'re welcome :wink:',
						},
					],
					thumbnail: {
						url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg',
					},
					image: {
						url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/A_picture_from_China_every_day_108.jpg',
					},
					timestamp: new Date(),
					footer: {
						text: 'Woah! So cool! :smirk:',
						icon_url: 'https://i.imgur.com/fKL31aD.jpg',
					},
				},
			],
		})
	}
}
