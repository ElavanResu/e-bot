/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/logDeletedMessages.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 4th 2020, 2:05:00 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')

const logDeletedMessages = async (message) => {

	if (!message.guild) return

	try {
		const fetchedLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		})

		const msgToDelete = fetchedLogs.entries.first()

		if (!msgToDelete) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found`)

		const { executor } = msgToDelete

		const hook = new Discord.WebhookClient(`${process.env.HOOKID}`, `${process.env.HOOKTOKEN}`)

		hook.send({
			username: 'logs',
			avatarUrl: 'https://i.imgur.com/5Dctm5N.jpg',
			embeds: [
				{
					author: {
						name: `${executor.username}`,
						// url: 'https://www.reddit.com/r/cats/',
						icon_url: `${executor.displayAvatarURL({ format: 'png', dynamic: true })}`,
					},
					title: `A message by ${message.author.tag} was deleted.`,
					description: `${message.content}`,
					color: 0xfc442b,
					fields: [
						{
							name: '**Server**',
							value: `${message.guild.name}`,
							inline: true,
						},
						{
							name: '\u200b',
							value: '\u200b',
							inline: true,
						},
						{
							name: '**Channel**',
							value: `${message.channel.name}`,
							inline: true,
						},
					],
					timestamp: new Date(),
					footer: {
						text: `Deleter's Id: ${executor.id}`,
						icon_url: 'https://i.imgur.com/fKL31aD.jpg',
					},
				},
			],
		})

		// console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}`)

	} catch (error) {
		message.channel.send(`Error in fetching audit logs: ${error}`)
	}
}

module.exports = {
	logDeletedMessages,
}
