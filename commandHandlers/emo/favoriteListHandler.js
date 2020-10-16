/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/favoriteListHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 17th 2020, 1:35:37 am
 * Author: Shubham Navale
 * -----
 * Last Modified:s
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getFavoriteEmojiNamesList } = require('../../dbObjects')
const { prefix } = require('../../config.json')

const favoriteListHandler = async (message) => {
  try {
    if (!message.mentions.users.size) {
      const emojiList = await getFavoriteEmojiNamesList(message.author.id)
      if (emojiList.length > 0) {
        const customListEmbed = new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setTitle('Your favorite list:')
          .setTimestamp()
          .setFooter(`Asked by ${message.author.username}`)
          const customList = emojiList.map(ele => ele.emoji_name)
          customListEmbed.setDescription(customList)
        return message.channel.send(customListEmbed)
      }
      return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Your favorite list is empty. Start adding your favorite emojis by typing\n\`${prefix}emo setfav [nitro name]\``)
			)
    }

    const mentionedUser = message.mentions.users.first()
    const emojiList = await getFavoriteEmojiNamesList(mentionedUser.id)
    if (emojiList.length > 0) {
      const customListEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle(`${mentionedUser.username}'s favorite list:`)
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`)
        const customList = emojiList.map(ele => ele.emoji_name)
        customListEmbed.setDescription(customList)
      return message.channel.send(customListEmbed)
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${mentionedUser.username}'s favorite list is empty.`)
    )
  } catch (error) {
    console.log('Error in favoriteListHandler: ', error)
  }
}

module.exports = favoriteListHandler