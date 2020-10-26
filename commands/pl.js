/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/pl.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 11:27:18 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 26 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const permsListHandler = require('../commandHandlers/perms/permsListHandler')
const setPermsHandler = require('../commandHandlers/perms/setPermsHandler')
const globalUsers = require('../metaData/globalUsers')

module.exports = {
	name: 'pl',
	description: 'Manage playlist',
	args: true,
  guildOnly: true,
  aliases: ['playlist'],
	usage: 'play <playlist name>',
	moreInfo: `Manage playlist`,
  cooldown: -1,
  async execute(message, args, { musicQueue, queue }) {
    // Permissions
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'playlists')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }

    if (!args[0]) return message.channel.send(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription(`Missing argument`)
		)

    if (args[0] === 'play') {
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Play list name not specified`)
      )

      const playlistName = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')

      const playlist = await getMemberPlaylistHandler(message, playlistName)
      console.log('Playlist: ', playlist)

    }
  }
}