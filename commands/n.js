/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/n.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 12:47:28 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 06 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'n',
	description: 'Skips the current song',
	args: false,
	usage: '',
	guildOnly: true,
	aliases: ['next'],
	async execute(message, args, musicQueue, queue) {

		// Check perms
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'music_next')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}

		// Checks users status on voice channel
		const voiceChannel = message.member.voice.channel
		if (!voiceChannel) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription('You are not on a voice channel')
		)

		try {
			if (!musicQueue) return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription('There is no song that I could skip!')
			)
			await message.react('⏭️')
			musicQueue.connection.dispatcher.end()
		} catch (error) {
			console.log(`Error in going forward: ${error}`)
		}
	}
}