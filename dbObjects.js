/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbObjects.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:55:30 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 19 2020
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
const restrictedUsers = require('./models/RestrictedUsers')
const customCommands = require('./models/CustomCommands')
const favoriteEmoji = require('./models/FavoriteEmojis')
const memberReactions = require('./models/MemberReactions')
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

// Restricted Users helpers
const RestrictedUsers = restrictedUsers.restrictedUsersSchema(sequelize, Sequelize.DataTypes)

const findMember = async (memberId, guildId) => {
  return await restrictedUsers.findMember(RestrictedUsers, memberId, guildId)
}

const getAllMembers = async (guildId) => {
  return await restrictedUsers.getAllMembers(RestrictedUsers, guildId)
}

const addMember = async (memberId, guildId) => {
  return await restrictedUsers.addMember(RestrictedUsers, memberId, guildId)
}

const removeMember = async (memberId, guildId) => {
  return await restrictedUsers.removeMember(RestrictedUsers, memberId, guildId)
}

// Custom Command helpers
const CustomCommands = customCommands.customCommandsSchema(sequelize, Sequelize.DataTypes)

const getCustomMessage = async (guildId, customCommand) => {
  return await customCommands.getCustomMessage(CustomCommands, guildId, customCommand)
}

const getAllCommands = async (guildId) => {
  return await customCommands.getAllCommands(CustomCommands, guildId)
}

const addCustomCommand = async (guildId, customCommand, customMessage) => {
  return await customCommands.addCustomCommand(CustomCommands, guildId, customCommand, customMessage)
}

const removeCustomCommand = async (guildId, customCommand) => {
  return await customCommands.removeCustomCommand(CustomCommands, guildId, customCommand)
}

// Favorite Emoji helpers
const FavoriteEmoji = favoriteEmoji.favoriteEmojisSchema(sequelize, Sequelize.DataTypes)

const getFavoriteEmojiNamesList = async (memberId) => {
  return await favoriteEmoji.getFavoriteEmojiNamesList(FavoriteEmoji, memberId)
}

const addFavoriteEmoji = async (memberId, emojiName) => {
  return await favoriteEmoji.addFavoriteEmoji(FavoriteEmoji, CustomEmojis, memberId, emojiName)
}

const delFavoriteEmoji = async (memberId, emojisName) => {
  return await favoriteEmoji.delFavoriteEmoji(FavoriteEmoji, memberId, emojisName)
}

// Member Reactions helpers
const MemberReactions = memberReactions.memberReactionsSchema(sequelize, Sequelize.DataTypes)

const getReactionsDetailsForMember = async (memberId) => {
  return await memberReactions.getReactionsDetailsForMember(MemberReactions, memberId)
}

const getAllMemberReactionsDetails = async () => {
  return await memberReactions.getAllMemberReactionsDetails(MemberReactions)
}

const addReactionsDetails= async (memberId, guildId, data) => {
  return await memberReactions.addReactionsDetails(MemberReactions, memberId, guildId, data)
}

const removeReactionsDetails = async (memberId, guildId) => {
  return await memberReactions.removeReactionsDetails(MemberReactions, memberId, guildId)
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
  getCustomEmojiNamesList,
  findMember,
  getAllMembers,
  addMember,
  removeMember,
  getCustomMessage,
  getAllCommands,
  addCustomCommand,
  removeCustomCommand,
  getFavoriteEmojiNamesList,
  addFavoriteEmoji,
  delFavoriteEmoji,
  getReactionsDetailsForMember,
  getAllMemberReactionsDetails,
  addReactionsDetails,
  removeReactionsDetails
}