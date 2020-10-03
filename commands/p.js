/* eslint-disable no-lonely-if */
/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/play.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 8:09:13 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const musicWhitelist = require('../metaData/musicWhiteList');
const spotifyHandelr = require('../commandHandlers/p/spotifyHandler');
const youtubeHandler = require('../commandHandlers/p/youtubeHandler');
const searchHandler = require('../commandHandlers/p/searchHandler');

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
		.setDescription(`[${song.title}](${song.url}) [<@${song.requestedBy}>]`);
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
		// let allow = false;
		// for(let count = 0; count < musicWhitelist.length; count++) {
		// 	if (message.author.id === musicWhitelist[count].id) {
		// 		allow = true;
		// 		break;
		// 	}
		// }
		// if (!allow) {
		// 	return message.channel.send('You are not allowed to use the music feature.');
		// }
		try {
			const voiceChannel = message.member.voice.channel;
			if (!voiceChannel) {
				return message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#3EFEFF')
						.setDescription(`You need to join a voice channel.`)
				)
			}
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!');
			}


			const searchString = args.toString().replace(/[, ]+/g, ' ');
			let newSongsQueue = [];
			if (searchString.includes('https://youtu.be') || searchString.includes('http://y2u.be') || searchString.includes('https://www.youtube.com')) {
				newSongsQueue = await youtubeHandler(message, searchString)
			} else if (searchString.includes('https://open.spotify.com')) {
				newSongsQueue = await spotifyHandelr(message, searchString)
				await message.react('🖕')
				if (newSongsQueue.length === 0) {
					const songErrorEmbed = new Discord.MessageEmbed()
					.setColor('#3EFEFF')
					.setDescription(`Error in loading the playlist`);
					return message.channel.send(songErrorEmbed);
				}
			} else {
				newSongsQueue = await searchHandler(message, searchString)
				if (newSongsQueue.length === 0) {
					const songErrorEmbed = new Discord.MessageEmbed()
					.setColor('#3EFEFF')
					.setDescription(`No results found for **${searchString}**`);
					return message.channel.send(songErrorEmbed);
				}
			}

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
				}
				const connection = await voiceChannel.join()
				queueContruct.connection = connection
				queueContruct.songs = [...newSongsQueue]
				queue.set(message.guild.id, queueContruct)
				if (newSongsQueue.length < 2) {
					message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#3EFEFF')
							.setTitle('**Added To Queue**')
							.setDescription(`[${newSongsQueue[0].title}](${newSongsQueue[0].url}) [<@${newSongsQueue[0].requestedBy}>]`)
					)
				} else {
					message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#3EFEFF')
							.setDescription(`${newSongsQueue.length} songs added to the queue`)
					)
				}
				play(message, queue, message.guild, queueContruct.songs[queueContruct.songPosition])
			} else {
				musicQueue.songs = [...musicQueue.songs, ...newSongsQueue]
				if (newSongsQueue.length < 2) {
					return message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#3EFEFF')
							.setTitle('**Added To Queue**')
							.setDescription(`[${newSongsQueue[0].title}](${newSongsQueue[0].url}) [<@${newSongsQueue[0].requestedBy}>]`)
					)
				} else {
					return message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#3EFEFF')
							.setDescription(`${newSongsQueue.length} songs added to the queue`)
					)
				}
			}
		} catch (error) {
			console.log('Error in play method: ', error);
			const songErrorEmbed = new Discord.MessageEmbed()
			.setColor('#3EFEFF')
			.setDescription(`Couldn't process the song`);
			return message.channel.send(songErrorEmbed);
		}
	},
};
