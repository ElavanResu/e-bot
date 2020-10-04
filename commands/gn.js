/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/gn.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, May 21st 2020, 8:23:34 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'gn',
	description: 'Wishes good nigh to people',
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size && message.author.id === '234249678328299520') {
			return message.channel.send('Good night my master.')
		}
		else if (!message.mentions.users.size) {
			return message.channel.send('Good night mate.')
		}
		const taggedUser = message.mentions.users.first()
		if (taggedUser.id === '234249678328299520') {
			return message.channel.send(`Good night Master ${taggedUser}. Sweet dreams.`)
		}
		message.channel.send(`Good night ${taggedUser}. Sweet Dreams.`)
	}
}
