/**
 * File: /home/elavanresu/ElavanResu/e-bot/features/logChats.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, September 22nd 2020, 8:51:04 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Oct 01 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')

const logChats = async (message) => {
  if (message.guild.id === process.env.TARGETGUILD && !message.author.bot){
    const hook = new Discord.WebhookClient(`${process.env.CHATHOOKID}`, `${process.env.CHATHOOKTOKEN}`);
    console.log('message.content: ', message.content)
    console.log('type of msg content: ', typeof message.content)
		hook.send(`${message.content}`,{
			username: `${message.author.tag}`,
			avatarURL: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
    });
  }
}

module.exports = logChats