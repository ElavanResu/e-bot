/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/CustomEmojiNames.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 7:47:20 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 05 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const customEmojiNamesSchema = (sequelize, DataTypes) => {
  return sequelize.define('custom_emoji_names', {
    custom_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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

const addCustomEmojiName = async (SequelizeConnetion, CustomEmojiSeqCon, memberId, customName, emojiName) => {
  try {
    const customEmojiNameObject = await SequelizeConnetion.findOne({
      where: { custom_name: customName, member_id: memberId }
    })

    const customEmojiObject = await CustomEmojiSeqCon.findOne({
      where: { emoji_name: emojiName }
    })
    if (!customEmojiObject) {
      return {
        status: 'failed',
        message: `Invalid emoji name. **${emojiName}** is not valid custom emoji name`
      }
    }

    if (!customEmojiNameObject) {
      await SequelizeConnetion.create({
        custom_name: customName,
        emoji_name: emojiName,
        member_id: memberId
      })
      return {
        status: 'success'
      }
    }
    return {
      status: 'failed',
      message: `**${customName}** is already in use. Either use a new name or unasign **${customName}** from the emoji it is using`
    }
  } catch (error) {
    console.log('Error in addCustomEmojiName: ', error)
  }
}

const getCustomEmojiNameDetails = async (SequelizeConnetion, memberId, customName) => {
  try {
    const customEmojiNameObject = await SequelizeConnetion.findOne({
      where: { custom_name: customName, member_id: memberId }
    })
    if (customEmojiNameObject) {
      return {
        status: 'success',
        data: customEmojiNameObject
      }
    }
    return {
      status: 'failed',
      message: `**${customName}** is not assigned to any emoji`
    }
  } catch (error) {
    console.log('Error in getCustomEmojiNameDetails: ', error)
  }
}

const delCustomEmojiName = async (SequelizeConnetion, memberId, customName) => {
  try {
    const customEmojiNameObject = await SequelizeConnetion.findOne({
      where: { custom_name: customName, member_id: memberId }
    })
    if (customEmojiNameObject) {
      customEmojiNameObject.destroy()
      return {
        status: 'success'
      }
    }
    return {
      status: 'failed',
      message: `**${customName}** is not currently assigned to any emoji.`
    }
  } catch (error) {
    console.log('Error in delCustomEmojiName: ', error)
  }
}

const getCustomEmojiNamesList = async (SequelizeConnetion, memberId) => {
  try {
    const customEmojiNamesList = await SequelizeConnetion.findAll({
      where: { member_id: memberId},
      attributes: ['custom_name', 'emoji_name']
    })
    return customEmojiNamesList
  } catch (error) {
    console.log('Error in getCustomEmojiNamesList: ', error)
  }
}

module.exports = {
  customEmojiNamesSchema,
  addCustomEmojiName,
  getCustomEmojiNameDetails,
  delCustomEmojiName,
  getCustomEmojiNamesList
}