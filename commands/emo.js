/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/emo.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 3rd 2020, 4:33:24 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Fri Oct 16 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const globalUsers = require('../metaData/globalUsers')
const Discord = require('discord.js')
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const listHandler = require('../commandHandlers/emo/listHandler')
const { prefix } = require('../config.json')
const setCustomNameHandler = require('../commandHandlers/emo/setCustomNameHandler')
const delCustomNameHandler = require('../commandHandlers/emo/delCustomNameHandler')
const customListHandler = require('../commandHandlers//emo/customListHandler')
const addEmojiCodeManuallyHelper = require('../commandHandlers/emo/addEmojiCodeManuallyHelper')
const checkAllHandler = require('../commandHandlers/emo/checkAllHandler')

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
    if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'custom_emojis_settings')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
    }
    if (!args[0]) return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('#A6011F')
        .setDescription(`Invalid Arguments. Type **${prefix} help emo** to know more.`)
    )

    if (args[0] === 'list') {
      await listHandler(message)
    } else if (args[0] === 'checkall') {
      if (!globalUsers.hasOwnProperty(message.author.id)) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription(`Sorry, no one is allowed to use the system features`)
        )
      }
      await checkAllHandler(message)
    } else if (args[0] === 'customlist' || args[0] === 'custlist') {
      await customListHandler(message)
    } else if (args[0] === 'manset') {
      if (!globalUsers.hasOwnProperty(message.author.id)) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription(`Sorry, no one is allowed to use the system features`)
      )

      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Emoji name not specified')
      )
      if (!args[2]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Emoji code not specified')
      )

      await addEmojiCodeManuallyHelper(message, args[1], args[2], args[3])
    } else if (args[0] === 'set') {
      try {
        if (!args[1]) return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription('Custom name not specified')
        )
        if (!args[2]) return message.channel.send(
          new Discord.MessageEmbed()
            .setColor('#A6011F')
            .setDescription('Emoji name not specified')
        )
        await setCustomNameHandler(message, message.author.id, args[1], args[2])
      } catch (error) {
        console.log('error in setting up aliases:  ', error)
      }
    } else if (args[0] === 'del') {
      if (!args[1]) return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('#A6011F')
          .setDescription('Emoji name not specified')
      )
      await delCustomNameHandler(message, message.author.id, args[1])
    }
  }
}