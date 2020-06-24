/**
 * File: /Users/shubham/ElavanResu/asach-bot/models/tasks.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 1:24:31 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Jun 09 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
exports.init = (sequelize, Sequelize) => {
  console.log('inside tasks init');
	return sequelize.define('tasks', {
		task: Sequelize.STRING,
		description: Sequelize.STRING,
		done: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	});
};
