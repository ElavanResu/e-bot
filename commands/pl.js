/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/pl.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 11:27:18 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const { globalUsers } = require('../metaData/globalUsers')
const getMemberPlaylistHandler = require('../commandHandlers/pl/getMemberPlaylistHandler')
const createPlaylistHandler = require('../commandHandlers/pl/createPlaylistHandler')
const listAllPlaylistsHandler = require('../commandHandlers/pl/listAllPlaylistsHandler')
const addToPlaylistHandler = require('../commandHandlers/pl/addToPlaylistHandler')
const removeSongFromPlaylistHandler = require('../commandHandlers/pl/removeSongFromPlaylistHandler')
const removePlaylist = require('../commandHandlers/pl/removePlaylist')

module.exports = {
	name: 'pl',
	description: 'Manage playlist',
	args: true,
  guildOnly: true,
  aliases: ['playlist'],
	usage: 'play <playlist name>',
	moreInfo: `Manage playlist`,
  cooldown: -1,
  async execute(message, args, { musicQueue, queue, client }) {
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

      const response = await getMemberPlaylistHandler(message, playlistName)
      console.log('response: ', response.dataValues)

      if (response) {
        const command = client.commands.get('p')
        await command.execute(message, args, { musicQueue, queue, client, playlist: JSON.parse(response.dataValues.playlist) })
      }

    } else if (args[0] === 'create') {
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Play list name not specified`)
      )

      const playlistName = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')

      await createPlaylistHandler(message, playlistName)
    } else if (args[0] === 'list') {
      const playlistName = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
      await listAllPlaylistsHandler(message, playlistName)
    } else if (args[0] === 'add') {
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Play list name not specified`)
      )
      const splitList = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ').split(/;+/g)
      const playlistName = splitList.shift()
      const command = client.commands.get('p')
      let songs = []
      for (const searchString of splitList) {
        console.log('searchString: ', searchString)
        const response = await command.execute(message, args = [searchString], { musicQueue, queue, client, add: true })
        songs = [...songs, ...response]
      }

      console.log('songs: ', songs)
      await addToPlaylistHandler(message, playlistName, songs)
    } else if (args[0] === 'rm') {
      if (!isNaN(parseInt(args[1]))) {
        const playlistName = args.splice(2, args.length - 1).toString().replace(/[, ]+/g, ' ')
        await removeSongFromPlaylistHandler(message, parseInt(args[1]), playlistName)
      } else {
        const playlistName = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ')
        await removePlaylist(message, playlistName)
      }
    }
  }
}