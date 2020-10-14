/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/listHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 8:01:50 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getEmojiList } = require('../../dbObjects')
const Discord = require('discord.js')

const listHandler = async (message) => {
  try {
    const emojiList = await getEmojiList()
    const emojiListEmbed = new Discord.MessageEmbed()
    .setColor('#3EFEFF')
    .setTitle('Here\'s a list of all the custom emojis:')
    .setTimestamp()
    .setFooter(`Asked by ${message.author.username}`)

    const cmdList = emojiList.map(ele => ele.emoji_name).join('\n')
    emojiListEmbed.setDescription(cmdList)
    return message.channel.send(emojiListEmbed)
  } catch (error) {
    console.log('error in fetching emoji list:  ', error)
  }
}

module.exports = listHandler