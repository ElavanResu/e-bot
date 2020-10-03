/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbInit.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:41:30 pm
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

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	dialect: 'mysql',
	logging: false,
	storage: 'database.sqlite',
})

const CustomEmoji = require('./models/CustomEmojis')(sequelize, Sequelize.DataTypes)

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force }).then(async () => {
  try {
    await CustomEmoji.upsert({ emoji_name: 'NopeNope'.toLowerCase(), emoji_global_code: '<a:NopeNope:750875276040470539>', copies: 0 })
    console.log('Database synced')
    sequelize.close()
  } catch (error) {
    console.log('error: ', error)
  }
}).catch(console.error)