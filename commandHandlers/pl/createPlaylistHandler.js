/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/pl/createPlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, October 27th 2020, 12:11:50 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 27 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { createPlaylist } = require('../../dbObjects')

const createPlaylistHandler = async (message, playlistName) => {
  try {
    const response = await createPlaylist(message.author.id, playlistName)
    if (response.status !== 'success') {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`${response.message}`)
      )
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setDescription(`${response.message}`)
    )
  } catch (error) {
    console.log('Error in createPlaylistHandler: ', error)
  }
}

module.exports = createPlaylistHandler
