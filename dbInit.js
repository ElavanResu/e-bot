/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbInit.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:41:30 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 05 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Sequelize = require('sequelize')
const customEmojisModel = require('./models/CustomEmojis')
const permissionsModel = require('./models/Permissions.js')
const customEmojiNames = require('./models/CustomEmojiNames')
const { config } = require('dotenv')
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

const force = process.argv.includes('--force') || process.argv.includes('-f')

const CustomEmojis = customEmojisModel.customEmojisSchema(sequelize, Sequelize.DataTypes)

sequelize.sync({ force }).then(async () => {
  try {
    await CustomEmojis.upsert({ emoji_name: 'NopeNope'.toLowerCase(), emoji_global_code: '<a:NopeNope:750875276040470539>', copies: 0 })
    console.log('Database synced with custom emojis table')
    sequelize.close()
  } catch (error) {
    console.log('error: ', error)
  }
}).catch(console.error)

const Permissions = permissionsModel.permissionsSchema(sequelize, Sequelize.DataTypes)

sequelize.sync({ force }).then(async () => {
  try {
    await Permissions.upsert({
      member_id: '234249678328299520',
      guild_id: '666931933929930752',
      music_back: true,
      music_queue_clear: true,
      music_disconnet: true,
      music_next: true,
      music_play: true,
      music_pause: true,
      music_resume: true,
      music_que_remove_item: true,
      annoy: true,
      hook: true,
      custom_emojis: true,
      custom_emojis_settings: true,
      prune: true,
      reload_cmd: true
    })
    console.log('Database synced with Permissions table')
    sequelize.close()
  } catch (error) {
    console.log('error: ', error)
  }
}).catch(console.error)

const CustomEmojiNames = customEmojiNames.customEmojiNamesSchema(sequelize, Sequelize.DataTypes)

sequelize.sync({ force }).then(async () => {
  try {
    await CustomEmojiNames.upsert({ custom_name: 'thicass', emoji_name: 'ecl_thiccass', member_id: '234249678328299520' })
    console.log('Database synced with custom emoji names table')
    sequelize.close()
  } catch (error) {
    console.log('error: ', error)
  }
}).catch(console.error)
