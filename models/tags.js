/**
 * File: /Users/shubham/ElavanResu/asach-bot/models/tag.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 1:00:28 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Jun 09 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
exports.init = (sequelize, Sequelize) => {
  console.log('inside tags init');
	return sequelize.define('tags', {
		name: {
			type: Sequelize.STRING,
			unique: true,
		},
		description: Sequelize.TEXT,
		username: Sequelize.STRING,
		useage_count: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	});
}