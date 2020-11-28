/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/getMemberPlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 24th 2020, 12:51:48 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 24 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getMemberPlaylist } = require('../../dbObjects')

const getMemberPlaylistHandler = async (message, playlistName) => {
  try {
    const playlist = await getMemberPlaylist(message.author.id, playlistName)
    if (!playlist) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`**Playlist - ${playlistName}** doesn't exist`)
    )

    return playlist
  } catch (error) {
    console.log('Error in getMemberPlaylistHandler: ', error)
  }
}

module.exports = getMemberPlaylistHandler