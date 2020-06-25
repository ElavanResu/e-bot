/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/annoy.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Saturday, May 23rd 2020, 11:12:38 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'annoy',
	description: 'Sends private messages to annoy mentioned user, with or without custom message',
	cooldown: 15,
	usage: '<mention user> <message (optional)>',
	args: true,
	guildOnly: true,
	execute(message, args) {
		if (!message.mentions.users.size) return message.channel.send('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.');
		if (!args[0].startsWith('<@')) return message.channel.send('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.');
		if (args[1] === undefined) {
			message.mentions.users.map(user => {
				user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`);
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`), 1500);
				}
			});
		} else {
			const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ');
			message.mentions.users.map(user => {
				user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``);
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``), 1500);
				}
			});
		}
	},
};
