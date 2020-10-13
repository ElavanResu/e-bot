/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/cat/getRandomCatHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 1:23:43 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const {
  getRandomImage
} = require('../../services/thecatapi')
const Discord = require('discord.js')

const getRandomCatHandler = async (message) => {
  try {
    const resposne = await getRandomImage(message)
    const catImageEmbed = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
    if (resposne.breeds.length > 0) {
      catImageEmbed.setTitle(resposne.breeds[0].name)
    }
    catImageEmbed.setImage(resposne.url)
    return message.channel.send(catImageEmbed)
  } catch (error) {
    console.log('Error in getRandomCatHandler: ', error)
  }
}

module.exports = getRandomCatHandler
