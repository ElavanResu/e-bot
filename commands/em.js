/**
 * File: /home/elavanresu/ElavanResu/e-bot/commands/em.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Thursday, October 1st 2020, 11:03:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Oct 03 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
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

const { getEmojiCode } = require('../dbObjects')

const whiteList = [
	{
		name: 'ElavanResu',
		id: '234249678328299520',
	},
	{
		name: 'Pushieee',
		id: '686973497250938929'
	},
	{
		name: 'Dhruv',
		id: '460488764511223848'
	},
	// {
	// 	name: 'NiteBraek',
	// 	id: '403454311906148383',
	// },
	// {
	// 	name: 'AncientBeing',
	// 	id: '312541974844669952',
	// },
	{
		name: 'Jaegar',
		id: '427000717681885185',
	}
	// {
	// 	name: 'Molten',
	// 	id: '285661264099803137',
	// },
];

module.exports = {
	name: 'em',
	description: 'Puts emoji',
	args: true,
  guildOnly: true,
  aliases: ['emote', 'emoji', 'e'],
	usage: '<emojiName>',
	moreInfo: `Emoji list:`,
	cooldown: -1,
	async execute(message, args) {
		let allow = false;
		for(let count = 0; count < whiteList.length; count++) {
			if (message.author.id === whiteList[count].id) {
				allow = true;
				break;
			}
		}
		if (!allow) {
			return message.channel.send('You are not allowed to use custom emojis.');
		}
		message.delete();
		if (!message.channel) return console.log('channel not specified');
    if (!args[0]) return message.channel.send('Emoji not specified');

		// if (!args[0].startsWith('<@')) return console.log('Mention user');
		// if (!args[1]) return console.log('Message not specified');
		// const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ');
		// const mentionedUser = message.mentions.users.first();
		try {
			const emojiCode = await getEmojiCode(args[0])
			message.channel.fetchWebhooks()
			.then(webhook => {
				let foundHook;
				webhook.forEach(ele => {
					if (ele.name === 'SimonHook') foundHook = ele;
				});
				if (!foundHook) {
					message.channel.createWebhook('SimonHook')
						.then(newWebhook => {
							newWebhook.send(emojiCode, {
								'username': message.author.username,
								'avatarURL': `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`
							});
						})
						.catch (error => {
							console.log('error: ', error);
							return message.channel.send('Error, check console');
						});
				}
				else {
					foundHook.send(emojiCode, {
						'username': message.author.username,
						'avatarURL': `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
						// 'embeds': [{
						// 	// 'color': parseInt(`0x${color}`),
						// 	'description': message,
						// }]

					})
						.catch(error => {
							console.log('error: ', error);
							return console.log('Incorrect emoji or internal error');
						});
				}
			});
		} catch {
			console.log('error in fetching emoji code: ', error)
		}
	},
};
