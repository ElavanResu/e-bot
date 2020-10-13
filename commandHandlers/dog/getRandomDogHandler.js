/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/dog/getRandomDogHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 2:10:09 am
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
} = require('../../services/thedogapi')
const Discord = require('discord.js')

const getRandomDogHandler = async (message) => {
  try {
    const resposne = await getRandomImage(message)
    const dogImageEmbed = new Discord.MessageEmbed()
      .setColor('#3EFEFF')
    if (resposne.breeds.length > 0) {
      dogImageEmbed.setTitle(resposne.breeds[0].name)
    }
    dogImageEmbed.setImage(resposne.url)
    return message.channel.send(dogImageEmbed)
  } catch (error) {
    console.log('Error in getRandomDogHandler: ', error)
  }
}

module.exports = getRandomDogHandler
