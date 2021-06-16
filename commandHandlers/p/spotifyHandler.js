/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlerss/p/spotifyHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 10:10:06 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 17 2021
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
 } = require('../../services/spotify')

const spotifyHandler = async (message, searchString) => {
  try {
    const searchId = searchString.match(/[a-zA-Z0-9]{22}/g)
    if (searchString.includes('playlist')) {
      const playListRecordResponse = await getPlaylistRecord(searchId[0])
      return Promise.all(playListRecordResponse.map(async ele => {
        return {
          name: ele.track.name,
          astistName: ele.track.artists[0].name,
          requestedBy: message.author.id,
          type: 'normal'
        }
      }))
    } else if (searchString.includes('artist')) {
      const artistRecord = await getArtistRecord(searchId[0])
      return Promise.all(artistRecord.map(async ele => {
        return {
          name: ele.name,
          astistName: ele.artists[0].name,
          requestedBy: message.author.id,
          type: 'normal'
        }
      }))
    } else if (searchString.includes('album')) {
      const albumRecord = await getAlbumRecord(searchId[0])
      return Promise.all(albumRecord.map(async ele => {
        return {
          name: ele.name,
          astistName: ele.artists[0].name,
          requestedBy: message.author.id,
          type: 'normal'
        }
      }))
    } else if (searchString.includes('track')) {
      const trackRecord = await getTrackRecord(searchId[0])
      return [{
        name: trackRecord.name,
        astistName: trackRecord.artists[0].name,
        requestedBy: message.author.id,
        type: 'normal'
      }]
    }
    return []
  } catch (error) {
    console.log('Error in loading the spotify list: ', error)
  }
}

module.exports = spotifyHandler