/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/removeSongFromPlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, November 9th 2020, 1:15:03 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Nov 29 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { deletePlaylistSong } = require('../../dbObjects')
const removeSongFromPlaylistHandler = async (message, track, playlistName) => {
  try {
    const response = await deletePlaylistSong(message.author.id, playlistName, track)
    if (response.status === 'success') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`Song number **${track}** deleted from ${playlistName}`)
      )
    } else if (response.status === 'failed') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(response.message)
      )
    }
  } catch (error) {
    console.log('Error in removeSongFromPlaylistHandler: ', error)
  }
}

module.exports = removeSongFromPlaylistHandler
