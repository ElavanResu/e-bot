/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/play.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 8:09:13 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'd',
	description: 'Disconnects bot from voice channel',
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message, args, musicQueue, queue) {
		// Deletes the music queue of guild
		queue.delete(message.guild.id);

		try {
			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) {
				return message.channel.send('You are not on a voice channel');
			}
			await message.react('😭');
			voiceChannel.leave();
		} catch (error) {
			console.log(`error in disconnet music: ${error}`);
		}
	},
};
