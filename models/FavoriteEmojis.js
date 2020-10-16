/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/FavoriteEmojis.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 17th 2020, 1:49:32 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 17 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const favoriteEmojisSchema = (sequelize, DataTypes) => {
  return sequelize.define('favorite_emojis', {
    emoji_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    member_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}

const getFavoriteEmojiNamesList = async (SequelizeConnetion, memberId) => {
  try {
    const EmojiNamesList = await SequelizeConnetion.findAll({
      where: { member_id: memberId},
      attributes: ['emoji_name']
    })
    return EmojiNamesList
  } catch (error) {
    console.log('Error in getFavoriteEmojiNamesList: ', error)
  }
}

const addFavoriteEmoji = async (SequelizeConnetion, NitroEmojiSeqCon,  memberId, emojiName) => {
  try {
    const nitroEmojiObject = await NitroEmojiSeqCon.findOne({
      where: { emoji_name: emojiName }
    })

    if (!nitroEmojiObject) {
      return {
        status: 'failed',
        message: `**${emojiName}** is not a valid emoji.`
      }
    }

    const favoriteEmojiObject = await SequelizeConnetion.findOne({
      where: { emoji_name: emojiName, member_id: memberId }
    })

    if (!favoriteEmojiObject) {
      await SequelizeConnetion.create({
        emoji_name: emojiName,
        member_id: memberId
      })
      return {
        status: 'success'
      }
    }
    return {
      status: 'failed',
      message: `**${emojiName}** is already in use.`
    }
  } catch (error) {
    console.log('Error in addFavoriteEmoji: ', error)
  }
}

const delFavoriteEmoji = async (SequelizeConnetion, memberId, emojiName) => {
  try {
    const favoriteEmojiObject = await SequelizeConnetion.findOne({
      where: { emoji_name: emojiName, member_id: memberId }
    })
    if (favoriteEmojiObject) {
      favoriteEmojiObject.destroy()
      return {
        status: 'success'
      }
    }
    return {
      status: 'failed',
      message: `**${emojiName}** is not currently added to your favorite list.`
    }
  } catch (error) {
    console.log('Error in delFavoriteEmoji: ', error)
  }
}

module.exports = {
  favoriteEmojisSchema,
  getFavoriteEmojiNamesList,
  addFavoriteEmoji,
  delFavoriteEmoji
}