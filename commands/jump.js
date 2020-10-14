/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/jump.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 5th 2020, 9:46:06 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')

module.exports = {
  name: 'jump',
  description: 'Jumps to a specefic track',
	args: true,
  guildOnly: true,
  aliases: ['jp'],
	usage: '<track number>',
	moreInfo: `Jump to a specefic track`,
  cooldown: -1,
  async execute(message, args, { musicQueue, queue }) {
    // Check perms
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'music_jump')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }

    // Check for arguments
    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Please provide the track number.`)
    )

    if (isNaN(parseInt(args[0]))) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Invalid Arguments, enter a number. Type **${prefix} help jp** to know more.`)
    )

    // Checks users status on voice channel
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription('You are not on a voice channel')
			)
    }

    // Check for music playing
    if (!musicQueue) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription('There is no music playing!')
    )

    // Check for valid track number
    if (parseInt(args[0]) > musicQueue.songs.length || parseInt(args[0]) < 1) return message.channel.send(
    new Discord.MessageEmbed()
      .setColor('#A6011F')
      .setDescription('Invalid track number')
    )

    try {
      await message.react('↔️')
      musicQueue.songPosition = parseInt(args[0]) - 2
      musicQueue.connection.dispatcher.end()
    } catch (error) {
      console.log(`error in jumping to track ${args[0]}: ${error}`)
    }
  }
}