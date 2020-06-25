/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/b.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 6:15:15 pm
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
	name: 'b',
	description: 'Player moves back by one song',
	args: false,
	usage: '',
	guildOnly: true,
	aliases: ['back'],
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
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return message.channel.send('You are not on a voice channel');
		}

		try {
			if (!musicQueue) return message.channel.send('There is no song that I could skip!');
			console.log('songs before skip: ', musicQueue.songs);
			if (musicQueue.songPosition === 0) {
				return message.channel.send('Can\'t go back, this is the first song in the list');
			}
			await message.react('⏮️');
			musicQueue.songPosition = musicQueue.songPosition - 2;
			musicQueue.connection.dispatcher.end();
		} catch (error) {
			console.log(`Error in going back: ${error}`);
		}
	},
};