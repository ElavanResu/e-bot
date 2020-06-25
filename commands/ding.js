/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/ding.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, May 21st 2020, 7:49:46 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'ding',
	description: 'Ding!',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Dong.');
	},
};
