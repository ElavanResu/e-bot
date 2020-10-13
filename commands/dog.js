/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/dog.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 2:11:47 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const getRandomDogHandler = require('../commandHandlers/dog/getRandomDogHandler')

module.exports = {
	name: 'dog',
	description: 'Gets random dog image',
	args: false,
  guildOnly: true,
  aliases: ['getdog', 'doggo'],
	usage: '<emojiName>',
	moreInfo: `Gets random dog image`,
	cooldown: -1,
	async execute(message, args) {
    try {
      await getRandomDogHandler(message)
    } catch (error) {
      console.log('Error in fetching dog image: ', error)
    }
  }
}