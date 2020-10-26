/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/Playlists.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 10:56:19 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 27 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const playlistsSchema = (sequelize, DataTypes) => {
  return sequelize.define('playlists', {
    playlist_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    member_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playlist: {
      type: DataTypes.STRING(99999),
      allowNull: true
    }
  }, {
    timestamps: false
  })
}

const getAllMemberPlaylist = async (SequelizeConnetion, memberId) => {
  try {
    const playlistsObject = await SequelizeConnetion.findAll({
      where: { member_id: memberId }
    })

    return playlistsObject
  } catch (error) {
    console.log('Error in getAllMemberPlaylist: ', error)
  }
}

const getMemberPlaylist = async (SequelizeConnetion, memberId, playlistName) => {
  try {
    const playlistsObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, playlist_name: playlistName }
    })

    return playlistsObject
  } catch (error) {
    console.log('Error in getMemberPlaylist: ', error)
  }
}

const createPlaylist = async (SequelizeConnetion, memberId, playlistName) => {
  try {
    const playlistsObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, playlist_name: playlistName }
    })

    if (playlistsObject) {
      return {
        status: 'failed',
        message: 'Playlist already exists'
      }
    }

    await SequelizeConnetion.create({
      playlist_name: playlistName,
      member_id: memberId
    })

    return {
      status: 'success',
      message: `Playlist **${playlistName}** created`
    }
  } catch (error) {
    console.log('Error in createPlaylist: ', error)
  }
}

const addSongsToPlaylist = async (SequelizeConnetion, memberId, playlistName, songs) => {
  try {
    const playlistsObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, playlist_name: playlistName }
    })
    if (!playlistsObject) {
      return {
        status: 'failed'
      }
    }
    if (playlistsObject.playlist !== null && playlistsObject.playlist.length > 0) {
      playlistsObject.playlist = JSON.stringify([...JSON.parse(playlistsObject.playlist), ...songs])
    } else {
      playlistsObject.playlist = JSON.stringify(songs)
    }
    playlistsObject.save()
    return {
      status: 'success'
    }
  } catch (error) {
    console.log('Error in addSongsToPlaylist: ', error)
  }
}

module.exports = {
  playlistsSchema,
  getMemberPlaylist,
  createPlaylist,
  getAllMemberPlaylist,
  addSongsToPlaylist
}