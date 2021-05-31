/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/p/youtubePlaylistHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, March 21st 2021, 11:23:53 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon May 31 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const usetube = require('usetube')
const yts = require('yt-search')

const youtubeHandler = async (message, searchString) => {
  try {
    console.log('try: ', searchString)
    const test = searchString.replace('https://www.youtube.com/playlist?list=', '')
    console.log('test: ', test)
    const playlistResponse = await usetube.getPlaylistVideos(test, true)
    return Promise.all(playlistResponse.map(async ele => {
      const videoData = await yts({ videoId: ele.id })
      if (videoData) {
        return {
          title: videoData.title,
          url: videoData.url,
          requestedBy: message.author.id
        }
      }
    }))
  } catch (error) {
    console.log('Error in loading the youtube song: ', error)
  }
}

module.exports = youtubeHandler