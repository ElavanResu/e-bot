/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/addToPlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 27th 2020, 1:11:22 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 27 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { addSongsToPlaylist } = require('../../dbObjects')

const addToPlaylistHandler = async (message, playlistName, songs) => {
  try {
    const response = await addSongsToPlaylist(message.author.id, playlistName, songs)
    if (response.status !== 'success') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Error in adding the songs`)
      )
    }

    const playlistsEmbed = new Discord.MessageEmbed()
    .setColor('#3EFEFF')
    .setTitle(`Following songs added to **${playlistName}** playlist:`)
    .setTimestamp()
    .setFooter(`Asked by ${message.author.username}`)
    const playlists = songs.map(ele => `**${ele.title}** [<@${ele.requestedBy}>]`)
    playlistsEmbed.setDescription(playlists)
    return message.channel.send(playlistsEmbed)
  } catch (error) {
    console.log('Error in addToPlaylistHandler: ', error)
  }
}

module.exports = addToPlaylistHandler
