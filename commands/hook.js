/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/hook.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Monday, May 25th 2020, 6:02:46 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const whiteList = [
	{
		name: 'ElavanResu',
		id: '234249678328299520',
	},
	{
		name: 'NiteBraek',
		id: '403454311906148383',
	},
	{
		name: 'AncientBeing',
		id: '312541974844669952',
	},
	{
		name: 'Jaegar',
		id: '427000717681885185',
	},
	{
		name: 'Molten',
		id: '285661264099803137',
	},
];

module.exports = {
	name: 'hook',
	description: 'Hooks',
	args: true,
	guildOnly: true,
	execute(message, args) {
		console.log('guild: ', message.guild);
		let allow = false;
		for(let count = 0; count < whiteList.length; count++) {
			if (message.author.id === whiteList[count].id) {
				allow = true;
				break;
			}
		}
		if (!allow) {
			return message.channel.send('You are not allowed to use slv hook.');
		}
		message.delete();
		if (!message.channel) return console.log('channel not specified');
		if (!args[0]) return console.log('Title not specified');
		if (!args[0].startsWith('<@')) return console.log('Mention user');
		if (!args[1]) return console.log('Message not specified');
		const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ');
		const mentionedUser = message.mentions.users.first();
		message.channel.fetchWebhooks()
			.then(webhook => {
				console.log('Webhook: ', webhook);
				let foundHook;
				webhook.forEach(ele => {
					if (ele.name === 'SimonHook') foundHook = ele;
				});
				console.log('Then1: ', foundHook);
				if (!foundHook) {
					message.channel.createWebhook('SimonHook')
						.then(newWebhook => {
							newWebhook.send(`${msg}`, {
								'username': mentionedUser.username,
								'avatarURL': `${mentionedUser.displayAvatarURL({ format: 'png', dynamic: true })}`,
							// 'embeds': [{
							// 	'color': parseInt(`0x${color}`),
							// 	'description': message,
							// }]
							});
						})
						.catch (error => {
							console.log('error: ', error);
							return message.channel.send('Error, check console');
						});
				}
				else {
					console.log('avatarUrl: ', mentionedUser.avatarURL);
					foundHook.send(`${msg}`, {
						'username': mentionedUser.username,
						'avatarURL': `${mentionedUser.displayAvatarURL({ format: 'png', dynamic: true })}`,
						// 'embeds': [{
						// 	// 'color': parseInt(`0x${color}`),
						// 	'description': message,
						// }]

					})
						.catch(error => {
							console.log('error: ', error);
							return message.channel.send('error, check console');
						});
				}
			});
	},
};
