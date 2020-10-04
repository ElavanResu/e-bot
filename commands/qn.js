/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/qn.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 7:26:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
module.exports = {
	name: 'qn',
	description: 'Asks question to bot',
	usage: '<question>',
	guildOnly: true,
	execute(message, args) {
		if (!args.length) return message.channel.send('Provide one question.')
		const question = args.splice(0, args.length).toString().toLowerCase().replace(/[, ]+/g, ' ')
		if (question.length > 0 && question === 'how are you?') {
			message.channel.send('I am fine.')
		}
		if (question.length > 0 && question === 'am i loosing brain cells?') {
			message.channel.send('Yes.')
		}
		if (question.length > 0 && question === 'what should i do?') {
			message.channel.send('Just fly away my master.')
		}
	}
}
