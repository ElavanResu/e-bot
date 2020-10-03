/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/q.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Thursday, June 25th 2020, 7:26:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js');
const musicWhitelist = require('../metaData/musicWhiteList');

module.exports = {
	name: 'q',
	description: 'Displays the queue',
	args: false,
	usage: '',
	guildOnly: true,
	aliases: ['queue'],
	cooldown: -1,
	async execute(message, args, musicQueue, queue) {
		// let allow = false;
		// for(let count = 0; count < musicWhitelist.length; count++) {
		// 	if (message.author.id === musicWhitelist[count].id) {
		// 		allow = true;
		// 		break;
		// 	}
		// }
		// if (!allow) {
		// 	return message.channel.send('You are not allowed to use my music feature.');
		// }
		let listIndex
		if (!musicQueue) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#3EFEFF')
				.setDescription('Add songs in the queue')
		)
		if ((Math.floor(musicQueue.songs.length / 10) + 1) < parseInt(args[0])) {
			listIndex = Math.floor(musicQueue.songs.length / 10) + 1
		}
		else if (!args[0] || parseInt(args[0]) > 0) {
			listIndex = parseInt(args[0]) || 1
		}

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#3EFEFF')
					.setDescription('You are not on a voice channel')
			)
		}

		try {
			if (!musicQueue) {
				const emptyQueueEmbed = new Discord.MessageEmbed()
					.setColor('#3EFEFF')
					.setDescription('There is nothing in the queue! ☹️');
				return message.channel.send(emptyQueueEmbed);
			}
			await message.react('🗒️');
			const queueEmbed = new Discord.MessageEmbed()
				.setColor('#3EFEFF');

			let list = ''
			let listLimit
			let lowerLimit = (musicQueue.songs.length - (listIndex * 10 - 10))
			if (lowerLimit < 10) {
				listLimit = (listIndex * 10 - 10) + lowerLimit
			} else {
				listLimit = listIndex * 10
			}
			for (let songCount = (listIndex * 10) - 10; songCount < listLimit; songCount++) {
				if (musicQueue.songPosition === songCount) {
					list = list + `**${songCount + 1})   [${musicQueue.songs[songCount].title}](${musicQueue.songs[songCount].url})[<@${musicQueue.songs[songCount].requestedBy}>]** \n`;
				} else {
					list = list + `${songCount + 1})   [${musicQueue.songs[songCount].title}](${musicQueue.songs[songCount].url})[<@${musicQueue.songs[songCount].requestedBy}>] \n`;
				}
			}
			if (list.length !== 0) {
				queueEmbed.setDescription(list)
				.setFooter(`${listIndex}/${Math.floor(musicQueue.songs.length / 10) + 1}`)
				message.channel.send(queueEmbed);
			}
			// const helpEmbed = new Discord.MessageEmbed()
			// .setColor('#3EFEFF')
			// .setDescription(command.description)
			// .setTitle(command.name)
			// .setTimestamp()
			// .setFooter(`Asked by ${message.author.username}`);

			// if (command.description) helpEmbed.setDescription(command.description);
			// if (command.aliases) helpEmbed.addField('Aliases', `${command.aliases.join(', ')}`);
			// if (command.usage) helpEmbed.addField('Usage', `${prefix}${command.name} ${command.usage}`);
			// helpEmbed.addField('Cooldown', `${command.cooldown || 3} second(s)`);
			// message.channel.send(helpEmbed);
		} catch (error) {
			console.log(`Error in getting queue: ${error}`);
		}
	},
};