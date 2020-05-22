module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Shows the avatar of the mentioned user. If no user is mentioned, then the avatar of author displayed',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};
