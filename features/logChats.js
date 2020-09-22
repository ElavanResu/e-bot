/**
 * File: /home/elavanresu/ElavanResu/e-bot/features/logChats.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Tuesday, September 22nd 2020, 8:51:04 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Sep 22 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const Discord = require('discord.js')

const logChats = async (message) => {
  if (message.guild.id === process.env.TARGETGUILD && !message.author.bot){
    // console.log('called: ', `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
    const hook = new Discord.WebhookClient(`${process.env.CHATHOOKID}`, `${process.env.CHATHOOKTOKEN}`);
    console.log('message: ', message.content)
		hook.send(`${message.content}`,{
			username: `${message.author.tag}`,
			avatarURL: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
    });
  }
}

module.exports = logChats