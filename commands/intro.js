/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/intro.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, May 21st 2020, 8:20:41 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'intro',
	guildOnly: true,
	description: 'Gives the intro',
	execute(message, args) {
		message.channel.send('Hi, I am a slave of ElavanResu.')
	}
}
