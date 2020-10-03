/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlerss/p/spotifyHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 10:10:06 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const {
  getPlaylistRecord,
  getArtistRecord,
  getAlbumRecord,
	getTrackRecord
 } = require('../../services/spotifyServices')
 const yts = require('yt-search')

const spotifyHandler = async (message, searchString) => {
  try {
    const searchId = searchString.match(/[a-zA-Z0-9]{22}/g)
    if (searchString.includes('playlist')) {
      const playListRecordResponse = await getPlaylistRecord(searchId[0])
      return Promise.all(playListRecordResponse.map(async ele => {
        const results = await yts(`${ele.track.name} ${ele.track.artists[0].name}`)
        if (results.videos.length > 0) {
          return {
            title: results.videos[0].title,
            url: results.videos[0].url,
            requestedBy: message.author.id
          }
        }
      }))
    } else if (searchString.includes('artist')) {
      const artistRecord = await getArtistRecord(searchId[0])
      return Promise.all(artistRecord.map(async ele => {
        const results = await yts(`${ele.name} ${ele.artists[0].name}`)
        if (results.videos.length > 0) {
          return {
            title: results.videos[0].title,
            url: results.videos[0].url,
            requestedBy: message.author.id
          }
        }
      }))
    } else if (searchString.includes('album')) {
      const albumRecord = await getAlbumRecord(searchId[0])
      return Promise.all(albumRecord.map(async ele => {
        const results = await yts(`${ele.name} ${ele.artists[0].name}`)
        if (results.videos.length > 0) {
          return {
            title: results.videos[0].title,
            url: results.videos[0].url,
            requestedBy: message.author.id
          }
        }
      }))
    } else if (searchString.includes('track')) {
      const trackRecord = await getTrackRecord(searchId[0])
      const results = await yts(`${trackRecord.name} ${trackRecord.artists[0].name}`)
      return [{
        title: results.videos[0].title,
        url: results.videos[0].url,
        requestedBy: message.author.id
      }]
    }
    return []
  } catch (error) {
    console.log('Error in loading the spotify list: ', error)
  }
}

module.exports = spotifyHandler