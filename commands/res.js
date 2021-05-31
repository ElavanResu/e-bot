/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/res.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 10th 2020, 11:23:10 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const restrictUsersHandler = require('../commandHandlers/res/restrictUsersHandler')
const sendRestrictedUsersList = require('../commandHandlers/res/sendRestrictedUsersList')
const Discord = require('discord.js')
const { globalUsers } = require('../metaData/globalUsers')

module.exports = {
	name: 'res',
	description: 'Restricts user from typing anything on server',
	args: true,
  guildOnly: true,
  aliases: ['restrict'],
	usage: '<mention>',
	moreInfo: `Restricts user from typing anything on server`,
	cooldown: -1,
	async execute(message, args) {
    // Delete message
    message.delete()

    // Check perms
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'modify_restricted_users')) {
      const msgToDelete = message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)

      return
    }

    // Get the list of restricted users
    if (args[0] === 'list') {
      return await sendRestrictedUsersList(message)
    }

    // Check mentions
		if (!message.mentions.users.size) {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Dumbo, whom are you trying to restrict? You need to mention someone to annoy.')
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)

      return
    }

    // Check mention format
		if (!args[0].startsWith('<@')) {
      const msgToDelete = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Dumbo, whom are you trying to restrict? You need to mention someone to annoy.')
      )

      setTimeout(() => {
        msgToDelete.delete()
      }, 6000)

      return
    }

    // Check for global users
    const user = message.mentions.users.first()
    if (globalUsers.hasOwnProperty(user.id)) {
      await message.reply(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`**${message.author.username}**, you imbecile. No can restrict my master. He izz a god, bow before him.`)
      )
      return
    }
    await restrictUsersHandler(message, message.mentions.users.first(), message.guild.id)
  }
}