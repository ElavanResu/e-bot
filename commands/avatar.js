const Discord = require('discord.js')

module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Shows the avatar of the mentioned user. If no user is mentioned, then the avatar of author displayed',
	execute(message, args) {
		if (!message.mentions.users.size) {
			// return message.channel.send({ embed: {
			// 	color: 0x3EFEFF,
			// 	title: `Your profile pic`,
			// 	// url: 'https://discord.js.org',
			// 	image: {
			// 		url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
			// 	},
			// 	fields: [
			// 		{
			// 			name: 'Regular field title',
			// 			value: 'Some value here',
			// 		},
			// 		{
			// 			name: '\u200b',
			// 			value: '\u200b',
			// 			inline: false,
			// 		},
			// 		{
			// 			name: 'Inline field title',
			// 			value: 'Some value here',
			// 			inline: true,
			// 		},
			// 		{
			// 			name: 'Inline field title',
			// 			value: 'Some value here',
			// 			inline: true,
			// 		},
			// 		{
			// 			name: 'Inline field title',
			// 			value: 'Some value here',
			// 			inline: true,
			// 		},
			// 	],
			// 	timestamp: new Date(),
			// 	footer: {
			// 		text: `${message.author.username}`,
			// 		icon_url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
			// 	},
			// }});
			const embed = new Discord.MessageEmbed()
				.setColor('#3EFEFF')
				.setTitle('Your profile pic')
				.setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`)
				.setTimestamp()
				.setFooter(`${message.author.username}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);

			return message.channel.send(embed);
		}

		message.mentions.users.map(user => {
			message.channel.send({ embed: {
				color: 0x3EFEFF,
				title: `${user.username}'s profile pic`,
				// url: 'https://discord.js.org',
				image: {
					url: `${user.displayAvatarURL({ format: 'png', dynamic: true })}`,
				},
				timestamp: new Date(),
				footer: {
					text: `${message.author.username}`,
					icon_url: `${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`,
				},
			}});
		});
	},
};
