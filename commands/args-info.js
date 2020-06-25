/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/args-info.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, May 21st 2020, 9:06:03 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'args-info',
	description: 'Ping!',
	args: true,
	usage: '<arguments>',
	guildOnly: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};
