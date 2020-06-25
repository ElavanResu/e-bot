/* eslint-disable no-unused-vars */
/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/help.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Friday, May 22nd 2020, 12:35:36 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all commands or info about a specific command',
	alaises: ['commands'],
	usage: '<command name>',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		if (!args.length) {
			const helpEmbed = new Discord.MessageEmbed()
				.setColor('#3EFEFF')
				.setTitle('Here\'s a list of all my commands:')
				.setFooter('I hope this helps');

			const cmdList = commands.map(command => {
				return command.name;
			}).join('\n');
			helpEmbed.setDescription(cmdList);
			helpEmbed.addField('Note', `\nYou can send \`${prefix}help [command name]\` to get info on a specific command`);
			return message.author.send(helpEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent yoy a DM with all my commands!');
				})
				.catch (error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`);
					message.reply('It seems like I can\'t DM you! Do you have DM s disabled?');
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(cmd => cmd.alaises && cmd.alaises.includes(name));

		if (!command) {
			return message.reply('That\'s not a valid command');
		}

		// data.push(`**Name:** ${command.name}`);

		// if (command.alaises) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		// if (command.description) data.push(`**Description:** ${command.description}`);
		// if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		// data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		const helpEmbed = new Discord.MessageEmbed()
			.setColor('#3EFEFF')
			.setTitle(command.name)
			.setTimestamp()
			.setFooter(`Asked by ${message.author.username}`);

		if (command.description) helpEmbed.setDescription(command.description);
		if (command.aliases) helpEmbed.addField('Aliases', `${command.aliases.join(', ')}`);
		if (command.usage) helpEmbed.addField('Usage', `${prefix}${command.name} ${command.usage}`);
		helpEmbed.addField('Cooldown', `${command.cooldown || 3} second(s)`);
		message.channel.send(helpEmbed);
	},
};
