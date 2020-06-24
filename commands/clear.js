/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/s.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 1:30:17 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
module.exports = {
	name: 'clear',
	description: 'Clears the queue',
	args: false,
	guildOnly: true,
	usage: '',
	async execute(message, args, musicQueue, queue) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return message.channel.send('You are not on a voice channel');
		}
		if (!musicQueue) return message.channel.send('There is no song that I could skip!');
		musicQueue.songs = [];
	},
};