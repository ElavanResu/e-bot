/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/play.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 8:09:13 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Plays music from youtube',
	args: true,
	usage: '<youtube video link>',
	execute(message, args) {
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.channel.send('You need to join a voice channel.');
		}

		voiceChannel.join()
			.then(connection => {
				const stream = ytdl(args[0], { filter: 'audioonly' });
				const dispatcher = connection.play(stream);

				dispatcher.on('end', () => voiceChannel.leave());
			});
	},
};
