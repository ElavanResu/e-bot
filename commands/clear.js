/* eslint-disable no-unused-vars */
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
const musicWhitelist = require('../metaData/musicWhiteList');

module.exports = {
	name: 'clear',
	description: 'Clears the queue',
	args: false,
	guildOnly: true,
	usage: '',
	aliases: ['c'],
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
		if (!musicQueue) return message.channel.send('There is no song that I could skip!');
		musicQueue.songs = [];
	},
};