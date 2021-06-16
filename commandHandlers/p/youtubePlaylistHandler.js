/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/p/youtubePlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, March 21st 2021, 11:23:53 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 17 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const usetube = require('usetube')

const youtubeHandler = async (message, searchString) => {
  try {
    const test = searchString.replace('https://www.youtube.com/playlist?list=', '')
    const playlistResponse = await usetube.getPlaylistVideos(test, true)
    return Promise.all(playlistResponse.map(async ele => {
      return {
        name: ele.id,
        artistName: '',
        requestedBy: message.author.id,
        type: 'playlist'
      }
    }))
  } catch (error) {
    console.log('Error in loading the youtube song: ', error)
  }
}

module.exports = youtubeHandler