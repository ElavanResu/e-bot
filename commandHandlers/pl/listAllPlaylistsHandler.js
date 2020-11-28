/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/listAllPlaylistsHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 27th 2020, 12:43:42 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Oct 30 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getAllMemberPlaylist, getMemberPlaylist } = require('../../dbObjects')

const listAllPlaylistsHandler = async (message, playlistName) => {
  try {
    let response
    if (!message.mentions.users.size) {
      if (playlistName) {
        response = await getMemberPlaylist(message.author.id, playlistName)
        if (!response) return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`There are no songs added!!!`)
        )
        const playlistsEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle('Here are your songs:')
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`)

        const playlist = JSON.parse(response.dataValues.playlist)
        const playlists = playlist.map((ele, index) => `${index + 1} - ${ele.title}`)
        playlistsEmbed.setDescription(playlists)
        return message.channel.send(playlistsEmbed)
      } else {
        response = await getAllMemberPlaylist(message.author.id)
        if (response.length === 0) return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`There are no playlists added!!!`)
        )
        const playlistsEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle('Here are your playlists:')
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`)

        const playlists = response.map((ele, index) => `${index + 1} - ${ele.playlist_name}`)
        playlistsEmbed.setDescription(playlists)
        return message.channel.send(playlistsEmbed)
      }
    }

    if (playlistName) {
      const mentionedUser = message.mentions.users.first()
      const response = await getMemberPlaylist(mentionedUser.id, playlistName)
      if (response) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`There are no songs added!!!`)
      )
      const playlistsEmbed = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
      .setTitle(`Here are ${mentionedUser.username}'s playlist's songs:`)
      .setTimestamp()
      .setFooter(`Asked by ${message.author.username}`)
      const playlist = JSON.parse(response.dataValues.playlist)
      const playlists = playlist.map((ele, index) => `${index + 1} - ${ele.title}`)
      playlistsEmbed.setDescription(playlists)
      return message.channel.send(playlistsEmbed)
    } else {
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

      const playlists = response.map((ele, index) => `${index + 1} - ${ele.playlist_name}`)
      playlistsEmbed.setDescription(playlists)
      return message.channel.send(playlistsEmbed)
    }
  } catch (error) {
    console.log('Error in listAllPlaylistsHandler: ', error)
  }
}

module.exports = listAllPlaylistsHandler
