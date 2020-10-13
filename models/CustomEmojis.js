/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/CustomEmojis.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 12:39:52 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const customEmojisSchema = (sequelize, DataTypes) => {
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

const getEmojiList = async (SequelizeConnetion) => {
  try {
    const emojiList = await SequelizeConnetion.findAll()
    return emojiList
  } catch (error) {
    console.log('Error in getEmojiList: ', error)
  }
}

const getEmojiCode = async (SequelizeConnetion, emojiName) => {
  try {
    const customEmoji = await SequelizeConnetion.findOne({
      where: { emoji_name: emojiName }
    })

    if (customEmoji) {
      return customEmoji.emoji_global_code
    } else {
      return null
    }
  } catch (error) {
    console.log('Error in getEmojiCode: ', error)
  }
}

const addCustomEmoji = async (SequelizeConnetion, emojiName, emojiGlobalCode) => {
  const emojiObject = await SequelizeConnetion.findOne({
    where: { emoji_global_code: emojiGlobalCode }
  })

  if (!emojiObject) {
    const customEmoji = await SequelizeConnetion.findOne({
      where: { emoji_name: emojiName }
    })
    if (customEmoji) {
      customEmoji.copies += 1
      customEmoji.save()
      return SequelizeConnetion.create({ emoji_name: `${emojiName}${customEmoji.copies}`, emoji_global_code: emojiGlobalCode, copies: 0 })
    }
    return SequelizeConnetion.create({ emoji_name: emojiName, emoji_global_code: emojiGlobalCode, copies: 0 })
  }
}

module.exports = {
  customEmojisSchema,
  getEmojiList,
  getEmojiCode,
  addCustomEmoji
}