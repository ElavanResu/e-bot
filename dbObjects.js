/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbObjects.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:55:30 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 05 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Sequelize = require('sequelize')
const { config } = require('dotenv')
const customEmojiModel = require('./models/CustomEmojis')
const permissionsModel = require('./models/Permissions.js')
const customEmojiNames = require('./models/CustomEmojiNames')
if (process.env.NODE_ENV !== 'production') {
	config({
		path: __dirname + '/.env'
	})
}

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	dialect: 'mysql',
	logging: false,
	storage: 'database.sqlite',
})

// CUstom Emoji Helpers
const CustomEmojis = customEmojiModel.customEmojisSchema(sequelize, Sequelize.DataTypes)

const addCustomEmoji = async (emojiName, emojiGlobalCode) => {
  return await customEmojiModel.addCustomEmoji(CustomEmojis, emojiName, emojiGlobalCode)
}

const getEmojiCode = async (emojiName) => {
  return await customEmojiModel.getEmojiCode(CustomEmojis, emojiName)
}

const getEmojiList = async () => {
  return await customEmojiModel.getEmojiList(CustomEmojis)
}

// Permissions helpers
const Permissions = permissionsModel.permissionsSchema(sequelize, Sequelize.DataTypes)

const addPermission = async () => {
  return await permissionsModel.addPermission(Permissions)
}

const updatePermission = async (memberId, guildId, permType, permValue) => {
  return await permissionsModel.updatePermission(Permissions, memberId, guildId, permType, permValue)
}

const deletePermission = async () => {
  return await permissionsModel.deletePermission(Permissions)
}

const getMemberPerms = async (memberId, guildId) => {
  return await permissionsModel.getMemberPerms(Permissions, memberId, guildId)
}

// Custom Emoji Names helpers
const CustomEmojiNames = customEmojiNames.customEmojiNamesSchema(sequelize, Sequelize.DataTypes)

const addCustomEmojiName = async (memberId, customName, emojiName) => {
  return await customEmojiNames.addCustomEmojiName(CustomEmojiNames, CustomEmojis, memberId, customName, emojiName)
}

const getCustomEmojiNameDetails = async (memberId, customName) => {
  return await customEmojiNames.getCustomEmojiNameDetails(CustomEmojiNames, memberId, customName)
}

const delCustomEmojiName = async (memberId, customName) => {
  return await customEmojiNames.delCustomEmojiName(CustomEmojiNames, memberId, customName)
}

const getCustomEmojiNamesList = async (memberId) => {
  return await customEmojiNames.getCustomEmojiNamesList(CustomEmojiNames, memberId)
}

module.exports = {
  addCustomEmoji,
  getEmojiCode,
  getEmojiList,
  addPermission,
  updatePermission,
  deletePermission,
  getMemberPerms,
  addCustomEmojiName,
  getCustomEmojiNameDetails,
  delCustomEmojiName,
  getCustomEmojiNamesList
}