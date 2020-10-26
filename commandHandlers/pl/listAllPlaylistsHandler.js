/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/listAllPlaylistsHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 27th 2020, 12:43:42 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 27 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getAllMemberPlaylist } = require('../../dbObjects')

const listAllPlaylistsHandler = async (message) => {
  try {
    if (!message.mentions.users.size) {
      const response = await getAllMemberPlaylist(message.author.id)
      if (response.length === 0) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`There are no playlists added!!!`)
      )
      const playlistsEmbed = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
      .setTitle('Here\'s your playlists:')
      .setTimestamp()
      .setFooter(`Asked by ${message.author.username}`)

      const playlists = response.map(ele => ele.playlist_name)
      playlistsEmbed.setDescription(playlists)
      return message.channel.send(playlistsEmbed)
    }

    const mentionedUser = message.mentions.users.first()
    const response = await getAllMemberPlaylist(mentionedUser.id)
    if (response.length === 0) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`There are no playlists added!!!`)
    )
    const playlistsEmbed = new Discord.MessageEmbed()
    .setColor('#3EFEFF')
    .setTitle(`Here\'s ${mentionedUser.username}'s playlists:`)
    .setTimestamp()
    .setFooter(`Asked by ${message.author.username}`)

    const playlists = response.map(ele => ele.playlist_name)
    playlistsEmbed.setDescription(playlists)
    return message.channel.send(playlistsEmbed)
  } catch (error) {
    console.log('Error in listAllPlaylistsHandler: ', error)
  }
}

module.exports = listAllPlaylistsHandler
