/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/cat.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 1:20:44 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const getRandomCatHandler = require('../commandHandlers/cat/getRandomCatHandler')

module.exports = {
	name: 'cat',
	description: 'Gets random cat image',
	args: false,
  guildOnly: true,
  aliases: ['getcat', 'kitty'],
	usage: '<emojiName>',
	moreInfo: `Gets random cat`,
	cooldown: -1,
	async execute(message, args) {
    try {
      await getRandomCatHandler(message)
    } catch (error) {
      console.log('Error in fetching cat image: ', error)
    }
  }
}