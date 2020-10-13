/**
 * File: /home/elavanresu/ElavanResu/e-bot/services/spotifyServices/index.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 7:23:03 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const axios = require('axios')
const qs = require('qs')

const token = {
  accessToken: '',
  expiresIn: -1
}

const getAuthToken = async () => {
  const data = qs.stringify({
    'grant_type': 'client_credentials'
  })
  const base64EncodedCredentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${base64EncodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data
    })
    return response.data
  } catch(error) {
    console.log('error in geting token: ', error)
  }
}

const initialiseSpotifyServices = async () => {
  try {
    const authResponse = await getAuthToken()
    token.accessToken = authResponse.access_token,
    token.expiresIn = Math.floor(Date.now() / 1000) + authResponse.expires_in - 30
  } catch (error) {
    console.log('Error in initialiseSpotifyServices: ', error)
  }
}

const checkTokenValidity = () => {
  return Math.floor(Date.now() / 1000) < token.expiresIn
}

const getAccessToken = async () => {
  try {
    const isValid = checkTokenValidity()
    if (isValid) {
      return token.accessToken
    } else {
      await initialiseSpotifyServices()
      return token.accessToken
    }
  } catch (error) {
    console.log('Error in getAccessToken: ', error)
  }
}

const getPlaylistRecord = async (searchId) => {
  try {
    const accessToken = await getAccessToken()
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${searchId}/tracks`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.items
  } catch (error) {
    console.log('error in getting playlist records: ', error)
  }
}

const getArtistRecord = async (searchId) => {
  try {
    const accessToken = await getAccessToken()
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${searchId}/top-tracks?country=US`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.tracks
  } catch (error) {
    console.log('error in getting artist record: ', error)
  }
}

const getAlbumRecord = async (searchId) => {
  try {
    const accessToken = await getAccessToken()
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/albums/${searchId}/tracks`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.items
  } catch (error) {
    console.log('error in getting album record: ', error)
  }
}

const getTrackRecord = async (serachId) => {
  try {
    console.log('before get Access token')
    const accessToken = await getAccessToken()
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/tracks/${serachId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.log('error in getting track record: ', error)
  }
}

module.exports = {
  getPlaylistRecord,
  getArtistRecord,
  getAlbumRecord,
  getTrackRecord,
  initialiseSpotifyServices
}