/* eslint-disable no-lonely-if */
/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/play.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 8:09:13 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const ytdl = require('ytdl-core')
const Discord = require('discord.js')
const spotifyHandelr = require('../commandHandlers/p/spotifyHandler')
const youtubeHandler = require('../commandHandlers/p/youtubeHandler')
const searchHandler = require('../commandHandlers/p/searchHandler')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')

const play = (message, queue, guild, song) => {
	const musicQueue = queue.get(guild.id)

	if (!song) {
		musicQueue.voiceChannel.leave()
		queue.delete(guild.id)
		return
	}

	message.channel.send(
		new Discord.MessageEmbed()
			.setColor('#3EFEFF')
			.setTitle('**Now Playing**')
			.setDescription(`[${song.title}](${song.url}) [<@${song.requestedBy}>]`)
	)

	const dispatcher = musicQueue.connection.play(ytdl(song.url))

	dispatcher.on('finish', () => {
		console.log('Music ended!')
		musicQueue.songPosition++
		play(message, queue, guild, musicQueue.songs[musicQueue.songPosition])
	})

	dispatcher.on('error', (error) => {
		const hook = new Discord.WebhookClient(`${process.env.HOOKID}`, `${process.env.HOOKTOKEN}`)
		hook.send(`There is an error in dispatcher: ${error}\n\n ${JSON.stringify(error)}`,{
			username: `Music Bot`,
			avatarURL: `https://i.imgur.com/5Dctm5N.jpg`
    })
	})

	dispatcher.setVolumeLogarithmic(musicQueue.volume / 5)
}

module.exports = {
	name: 'p',
	description: 'Plays music from youtube',
	args: true,
	usage: '<spotify playlist>|<song name>|<youtube link>',
	guildOnly: true,
	aliases: ['play'],
	cooldown: 1,
	async execute(message, args, { musicQueue, queue }) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'music_play')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		try {
			const voiceChannel = message.member.voice.channel
			if (!voiceChannel) {
				return message.channel.send(
					new Discord.MessageEmbed()
						.setColor('#A6011F')
						.setDescription(`You need to join a voice channel.`)
				)
			}
			const permissions = voiceChannel.permissionsFor(message.client.user)
			if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
				return message.channel.send('I need the permissions to join and speak in your voice channel!')
			}


			const searchString = args.toString().replace(/[, ]+/g, ' ')
			let newSongsQueue = []
			if (searchString.includes('https://youtu.be') || searchString.includes('http://y2u.be') || searchString.includes('https://www.youtube.com')) {
				newSongsQueue = await youtubeHandler(message, searchString)
			} else if (searchString.includes('https://open.spotify.com')) {
				newSongsQueue = await spotifyHandelr(message, searchString)
				await message.react('🎵')
				if (newSongsQueue.length === 0) {
					return message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#A6011F')
							.setDescription(`Error in loading the playlist`)
					)
				}
			} else {
				newSongsQueue = await searchHandler(message, searchString)
				if (newSongsQueue.length === 0) {
					return message.channel.send(
						new Discord.MessageEmbed()
							.setColor('#A6011F')
							.setDescription(`No results found for **${searchString}**`)
					)
				}
			}

			let queueContruct
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
			console.log('Error in play method: ', error)
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Couldn't process the song`)
			)
		}
	}
}
