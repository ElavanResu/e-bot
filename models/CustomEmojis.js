/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/CustomEmojis.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 12:39:52 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 03 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('custom_emojis', {
    emoji_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    emoji_global_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}