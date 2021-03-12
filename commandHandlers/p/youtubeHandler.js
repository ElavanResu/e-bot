/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/p/youtubeHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 11:20:09 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Mar 12 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const ytdl = require('ytdl-core')

const youtubeHandler = async (message, searchString) => {
  try {
    const info = await ytdl.getBasicInfo(searchString)
    await message.react('🎵')
    return [{
      title: info.player_response.videoDetails.title,
      url: searchString,
      requestedBy: message.author.id
    }]
  } catch (error) {
    console.log('Error in loading the youtube song: ', error)
  }
}

module.exports = youtubeHandler