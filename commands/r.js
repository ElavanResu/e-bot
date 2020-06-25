/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/r.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 11:43:08 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const musicWhitelist = require('../metaData/musicWhiteList');

module.exports = {
	name: 'r',
	description: 'Resumes player',
	args: false,
	usage: '',
	guildOnly: true,
	aliases: ['resume'],
	async execute(message, args, musicQueue, queue) {
		let allow = false;
		for(let count = 0; count < musicWhitelist.length; count++) {
			if (message.author.id === musicWhitelist[count].id) {
				allow = true;
				break;
			}
		}
		if (!allow) {
			return message.channel.send('You are not allowed to use my music feature.');
		}
		try {
			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) {
				return message.channel.send('You are not on a voice channel');
			}
			if (!musicQueue) return message.channel.send('There is no song that I could skip!');
			await message.react('⏯️');
			musicQueue.connection.dispatcher.resume();
		} catch (error) {
			console.log(`Error in resuming the song: ${error}`);
		}
	},
};