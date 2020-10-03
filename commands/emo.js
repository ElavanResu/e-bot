/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/emo.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 4:33:24 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 03 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const { getEmojiList } = require('../dbObjects')
const Discord = require('discord.js');

module.exports = {
  name: 'emo',
  description: 'Custom emojis settings',
	args: true,
  guildOnly: true,
  aliases: ['emoset', 'emset'],
	usage: '<cmds>',
	moreInfo: `Emoji list:`,
	cooldown: -1,
	async execute(message, args) {
    if (args[0] === 'list') {
      try {
        const emojiList = await getEmojiList()
        const emojiListEmbed = new Discord.MessageEmbed()
        .setColor('#3EFEFF')
        .setTitle('Here\'s a list of all the custom emojis:')
        .setTimestamp()
        .setFooter(`Asked by ${message.author.username}`);

        const cmdList = emojiList.map(ele => ele.emoji_name).join('\n')
        emojiListEmbed.setDescription(cmdList)
        return message.channel.send(emojiListEmbed)
        // console.log('emojiList: ', emojiList)
      } catch (error) {
        console.log('error in fetching list:  ', error)
      }
    }
  }
}