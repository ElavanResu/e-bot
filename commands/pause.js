/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/pause.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 1:30:26 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const musicWhitelist = require('../metaData/musicWhiteList');

module.exports = {
	name: 'pause',
	description: 'Pauses the current song',
	args: false,
	usage: '',
	guildOnly: true,
	async execute(message, args, musicQueue, queue) {
		// let allow = false;
		// for(let count = 0; count < musicWhitelist.length; count++) {
		// 	if (message.author.id === musicWhitelist[count].id) {
		// 		allow = true;
		// 		break;
		// 	}
		// }
		// if (!allow) {
		// 	return message.channel.send('You are not allowed to use my music feature.');
		// }
		try {
			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) {
				return message.channel.send('You are not on a voice channel');
			}
			if (!musicQueue) return message.channel.send('There is no song that I could skip!');
			await message.react('⏸️');
			musicQueue.connection.dispatcher.pause(true);
		} catch (error) {
			console.log(`error in pausing the song: ${error}`);
		}
	},
};