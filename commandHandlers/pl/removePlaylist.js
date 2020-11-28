/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/removePlaylist.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, November 9th 2020, 1:15:22 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Nov 29 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { deletePlaylist } = require('../../dbObjects')
const removePlaylist = async (message, playlistName) => {
  try {
    console.log('Playlist ', playlist)
    const response = await deletePlaylist(message.author.id, playlistName)
    if (response.status === 'success') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setDescription(`Playlist **${playlistName}** deleted`)
      )
    } else if (response.status === 'error') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`There is no playlist as ${playlistName}!!!`)
      )
    }
  } catch (error) {
    console.log('Error in removePlaylist: ', error)
  }
}

module.exports = removePlaylist
