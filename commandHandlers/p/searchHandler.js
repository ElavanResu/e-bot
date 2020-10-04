/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/p/searchHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 11:25:26 pm
 * Author: Shubham Navale
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const yts = require('yt-search')

const searchHandler = async (message, searchString) => {
  try {
    const results = await yts(searchString)
    if (results.videos.length > 0) {
      await message.react('🎵')
      return [{
        title: results.videos[0].title,
        url: results.videos[0].url,
        requestedBy: message.author.id
      }]
    }
    return []
  } catch (error) {
    console.log('Error in searching the song: ', error)
  }
}

module.exports = searchHandler