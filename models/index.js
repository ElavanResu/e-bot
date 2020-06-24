/**
 * File: /Users/shubham/ElavanResu/asach-bot/models/index.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 1:23:04 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Jun 09 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Sequelize = require('sequelize');
const tags = require('./tags');
const tasks = require('./tasks');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'databse.sqlite',
});

module.exports = () => {
  console.log('inside init');
	return ({
		tags: tags.init(sequelize, Sequelize),
		tasks: tasks.init(sequelize, Sequelize),
	});
};
