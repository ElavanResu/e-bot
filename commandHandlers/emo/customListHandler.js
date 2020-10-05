/**
 * File: /home/elavanresu/ElavanResu/e-bot/commandHandlers/emo/customListHandler.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Monday, October 5th 2020, 12:02:36 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 05 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')
const { getCustomEmojiNamesList } = require('../../dbObjects')
const { prefix } = require('../../config.json')

const customListHandler = async (message) => {
  try {
    if (!message.mentions.users.size) {
      const emojiList = await getCustomEmojiNamesList(message.author.id)
      if (emojiList.length > 0) {
        const customListEmbed = new Discord.MessageEmbed()
          .setColor('#3EFEFF')
          .setTitle('Your custom list:')
          .setTimestamp()
          .setFooter(`Asked by ${message.author.username}`)
          const customList = emojiList.map(ele => `${ele.custom_name} --------- ${ele.emoji_name}`)
          customListEmbed.setDescription(customList)
        return message.channel.send(customListEmbed)
      }
      return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Your custom list is empty. Start assigning custom name to nitro emojis by typing \`${prefix}emo set [custom name] [nitro name]\``)
			)
    }

    const mentionedUser = message.mentions.users.first()
    const emojiList = await getCustomEmojiNamesList(mentionedUser.id)
    if (emojiList.length > 0) {
      const customListEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle(`${mentionedUser.username}'s custom list:`)
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`)
        const customList = emojiList.map(ele => `${ele.custom_name} --------- ${ele.emoji_name}`)
        customListEmbed.setDescription(customList)
      return message.channel.send(customListEmbed)
    }
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`${mentionedUser.username}'s custom list is empty`)
    )
  } catch (error) {
    console.log('error in custom list:  ', error)
  }
}

module.exports = customListHandler