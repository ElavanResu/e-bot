/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbObjects.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:55:30 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 03 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Sequelize = require('sequelize')
const { config } = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
	config({
		path: __dirname + '/.env'
	})
}

const sequelize = new Sequelize('ebot', process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
	storage: 'database.sqlite',
})

const CustomEmojis = require('./models/CustomEmojis')(sequelize, Sequelize.DataTypes)

const addCustomEmoji = async (emojiName, emojiGlobalCode) => {
  const emojiObject = await CustomEmojis.findOne({
    where: { emoji_global_code: emojiGlobalCode }
  })

  if (!emojiObject) {
    console.log('okay create')
    const customEmoji = await CustomEmojis.findOne({
      where: { emoji_name: emojiName }
    })
    if (customEmoji) {
      customEmoji.copies += 1
      customEmoji.save()
      console.log('update and create')
      console.log('emojiName', emojiName)
      console.log('new emoji name: ', `${emojiName}${customEmoji.copies}`)
      return CustomEmojis.create({ emoji_name: `${emojiName}${customEmoji.copies}`, emoji_global_code: emojiGlobalCode, copies: 0 })
    }
    console.log('first create')
    return CustomEmojis.create({ emoji_name: emojiName, emoji_global_code: emojiGlobalCode, copies: 0 })
  }
}

const getEmojiCode = async (emojiName) => {
  const customEmoji = await CustomEmojis.findOne({
    where: { emoji_name: emojiName }
  })

  if (customEmoji) {
    return customEmoji.emoji_global_code
  } else {
    return null
  }
}

module.exports = { addCustomEmoji, getEmojiCode }