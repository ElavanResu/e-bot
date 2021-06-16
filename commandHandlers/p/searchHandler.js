/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/p/searchHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 11:25:26 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 17 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const yts = require('yt-search')

const searchHandler = async (message, searchString) => {
  try {
    const results = await yts(searchString)
    await message.react('🎵')
    return [{
      name: results.videos[0].title,
      url: results.videos[0].url,
      astistName: '',
      requestedBy: message.author.id,
      type: 'stringSearch'
    }]
  } catch (error) {
    console.log('Error in searching the song: ', error)
  }
}

module.exports = searchHandler