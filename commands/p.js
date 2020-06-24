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
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const search = require('yt-search');

const play = (queue, guild, song) => {
	const musicQueue = queue.get(guild.id);

	if (!song) {
		musicQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = musicQueue.connection.play(ytdl(song.url));

	dispatcher.on('finish', () => {
		console.log('Music ended!');
		musicQueue.songs.shift();
		play(queue, guild, musicQueue.songs[0]);
	});

	dispatcher.setVolumeLogarithmic(musicQueue.volume / 5);
};

module.exports = {
	name: 'p',
	description: 'Plays music from youtube',
	args: true,
	usage: '<youtube video link>',
	guildOnly: true,
	async execute(message, args, musicQueue, queue) {
		try {
			const voiceChannel = message.member.voice.channel;

			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!');
			}

			if (!voiceChannel) {
				return message.channel.send('You need to join a voice channel.');
			}


			const searchString = args.toString().replace(/[, ]+/g, ' ');
			const song = {};
			if (searchString.includes('https://youtu.be') || searchString.includes('http://y2u.be') || searchString.includes('https://www.youtube.com')) {
				const info = await ytdl.getBasicInfo(searchString);
				console.log('Info: ', JSON.stringify(info.playerResponse.videoDetails.title));
				song.title = info.playerResponse.videoDetails.title;
				song.url = searchString;
			} else {
				const results = await yts(searchString);
				song.title = results.videos[0].title;
				song.url = results.videos[0].url;
			}
			// const results = await youtubeV3.search.list({
			// 	part: 'snippet',
			// 	type: 'video',
			// 	q: args.toString().replace(/[, ]+/g, ' '),
			// 	maxResults: 1,
			// 	// order: 'viewCount',
			// 	safeSearch: 'none',
			// 	// videoEmbeddable: true,
			// 	key: process.env.YOUTUBEAPIKEY,
			// });

			// const videoId = results.data.items[0].id.videoId;

			let queueContruct;
			if (!musicQueue) {
				queueContruct = {
					textChannel: message.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true,
				};
				const connection = await voiceChannel.join();
				queueContruct.connection = connection;
				queueContruct.songs.push(song);
				queue.set(message.guild.id, queueContruct);
				play(queue, message.guild, queueContruct.songs[0]);
			} else {
				musicQueue.songs.push(song);
				return message.channel.send(`${song.title} has been added to the queue!`);
			}
		} catch (error) {
			console.log('error: ', error);
		}
	},
};
