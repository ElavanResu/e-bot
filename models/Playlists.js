/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/Playlists.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Friday, October 23rd 2020, 10:56:19 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 24 2020
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
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: false
  })
}

const getMemberPlaylist = async (SequelizeConnetion, memberId, playlistName) => {
  try {
    const playlistsObject = await SequelizeConnetion.findAll({
      where: { member_id: memberId, playlist_name: playlistName }
    })

    return playlistsObject
  } catch (error) {
    console.log('Error in getMemberPlaylist: ', error)
  }
}

module.exports = {
  playlistsSchema,
  getMemberPlaylist
}