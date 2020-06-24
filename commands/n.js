/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/n.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 12:47:28 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

module.exports = {
	name: 'n',
	description: 'Skips the current song',
	args: false,
  usage: '',
  guildOnly: true,
	async execute(message, args, musicQueue, queue) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
			return message.channel.send('You are not on a voice channel');
    }

    if (!musicQueue) return message.channel.send('There is no song that I could skip!');
    console.log('songs before skip: ', musicQueue.songs);
	  musicQueue.connection.dispatcher.end();
	},
};