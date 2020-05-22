module.exports = {
	name: 'gn',
	description: 'Wishes good nigh to people',
	execute(message, args) {
		if (!message.mentions.users.size && message.author.id === '234249678328299520') {
			return message.channel.send('Good night my master.');
		}
		else if (!message.mentions.users.size) {
			return message.channel.send('Good night mate.');
		}
		const taggedUser = message.mentions.users.first();
		if (taggedUser.id === '234249678328299520') {
			return message.channel.send(`Good night Master ${taggedUser}. Sweet dreams.`);
		}
		message.channel.send(`Good night ${taggedUser}. Sweet Dreams.`);
	},
};
