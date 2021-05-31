/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/loop.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, March 21st 2021, 10:44:15 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Mar 21 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
 const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
 const Discord = require('discord.js')

 module.exports = {
   name: 'loop',
   description: 'Loops the queue',
   args: false,
   usage: '',
   guildOnly: true,
   aliases: ['l'],
   async execute(message, args, { musicQueue, queue }) {

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
       await message.react('➿')
       musicQueue.loop = !musicQueue.loop
       if (musicQueue.loop) {
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#3EFEFF')
            .setTitle('**Queue is looped**')
        )
       } else {
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#3EFEFF')
            .setTitle('**Loop removed**')
        )
       }
     } catch (error) {
       console.log(`Error in going forward: ${error}`)
     }
   }
 }