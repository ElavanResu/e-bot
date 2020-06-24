/**
 * File: /Users/shubham/ElavanResu/asach-bot/dbInit.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 10:41:30 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Jun 09 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
  const shop = [
    CurrencyShop.upsert({ name: 'Leg', cost: 1 }),
		CurrencyShop.upsert({ name: 'Head', cost: 2 }),
		CurrencyShop.upsert({ name: 'Hand', cost: 5 }),
  ];
  await Promise.all(shop);
  console.log('Database synced');
  sequelize.close();
}).catch(console.error);