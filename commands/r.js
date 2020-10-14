/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/r.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 11:43:08 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'r',
	description: 'Resumes player',
	args: false,
	usage: '',
	guildOnly: true,
	aliases: ['resume'],
	async execute(message, args, { musicQueue, queue }) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'music_resume')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		try {
			const voiceChannel = message.member.voice.channel
			if (!voiceChannel) {
				return message.channel.send('You are not on a voice channel')
			}
			if (!musicQueue) return message.channel.send('There is no song that I could skip!')
			await message.react('⏯️')
			musicQueue.connection.dispatcher.resume()
		} catch (error) {
			console.log(`Error in resuming the song: ${error}`)
		}
	}
}