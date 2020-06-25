/* eslint-disable no-lonely-if */
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
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const Discord = require('discord.js');
const musicWhitelist = require('../metaData/musicWhiteList');

const play = (message, queue, guild, song) => {
	const musicQueue = queue.get(guild.id);

	if (!song) {
		musicQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const nowPlayingEmbed = new Discord.MessageEmbed()
		.setColor('#3EFEFF')
		.setTitle('**Now Playing**')
		.setDescription(`[${song.title}](${song.url})`);
	message.channel.send(nowPlayingEmbed);

	const dispatcher = musicQueue.connection.play(ytdl(song.url));

	dispatcher.on('finish', () => {
		console.log('Music ended!');
		musicQueue.songPosition++;
		play(message, queue, guild, musicQueue.songs[musicQueue.songPosition]);
	});

	dispatcher.setVolumeLogarithmic(musicQueue.volume / 5);
};

module.exports = {
	name: 'p',
	description: 'Plays music from youtube',
	args: true,
	usage: '<youtube video link> or <song name>',
	guildOnly: true,
	aliases: ['play'],
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
				await message.react('🖕');
			} else {
				const results = await yts(searchString);
				console.log('yts results: ', results.videos[0]);
				console.log('length: ', results.videos.length);
				console.log('song: ', song);
				if (results.videos.length > 0) {
					console.log('here');
					song.title = results.videos[0].title;
					song.url = results.videos[0].url;
					await message.react('🖕');
				}
			}
			console.log('song after assignment: ', song);
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
					songPosition: 0,
					playing: true,
				};
				const connection = await voiceChannel.join();
				queueContruct.connection = connection;
				if (song.title !== undefined) {
					queueContruct.songs.push(song);
					queue.set(message.guild.id, queueContruct);
					play(message, queue, message.guild, queueContruct.songs[queueContruct.songPosition]);
				} else {
					return message.channel.send(`(if) No results for \`${searchString}\``);
				}
			} else {
				if (song.title !== undefined) {
					musicQueue.songs.push(song);
					const addToQueueEmbed = new Discord.MessageEmbed()
						.setColor('#3EFEFF')
						.setTitle('**Add To Queue**')
						.setDescription(`[${song.title}](${song.url})`);
					return message.channel.send(addToQueueEmbed);
				} else {
					console.log('song.title: ', song.title);
					return message.channel.send(`(else) No results for \`${searchString}\``);
				}
			}
		} catch (error) {
			console.log('error: ', error);
			message.channel.send(`Error in play method: ${error}`);
		}
	},
};
