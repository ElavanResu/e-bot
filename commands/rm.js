/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/rm.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 6th 2020, 12:26:16 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 06 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')

module.exports = {
  name: 'rm',
  description: 'Removes a song from queue',
	args: true,
  guildOnly: true,
  aliases: ['remove'],
	usage: '<track number>',
	moreInfo: `Removes a song from queue`,
  cooldown: -1,
  async execute(message, args, musicQueue, queue) {
    // Check perms
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, '`music_que_remove_item`')) {
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
      await message.react('🔪')
      message.channel.send(new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle('**Removed from the queue**')
        .setDescription(`[${musicQueue.songs[musicQueue.songPosition].title}](${musicQueue.songs[musicQueue.songPosition].url}) [<@${musicQueue.songs[musicQueue.songPosition].requestedBy}>]`)
      )
      musicQueue.songs.splice(parseInt(args[0]) - 1, 1)
      if (parseInt(args[0]) <= musicQueue.songPosition + 1) {
        musicQueue.songPosition--
      }
    } catch (error) {
      console.log(`error in removing the track ${args[0]}: ${error}`)
    }
  }
}