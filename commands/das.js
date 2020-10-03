/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/das.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 12:19:24 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'das',
	description: 'Poor Dev Das command requested by Jaegar (Fat gurl)',
	cooldown: -1,
	guildOnly: true,
	execute(message, args) {
		message.channel.send('https://tenor.com/view/devdas-shah-rukhkhan-crying-sad-tears-gif-5228894');
	},
};
