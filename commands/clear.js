/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/s.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 1:30:17 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'clear',
	description: 'Clears the queue',
	args: false,
	guildOnly: true,
	usage: '',
	aliases: ['c'],
	async execute(message, args, musicQueue, queue) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'music_queue_clear')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		const voiceChannel = message.member.voice.channel
		if (!voiceChannel) {
			return message.channel.send('You are not on a voice channel')
		}
		if (!musicQueue) return message.channel.send('There is no song that I could skip!')
		musicQueue.songs = []
	}
}