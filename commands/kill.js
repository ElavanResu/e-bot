module.exports = {
	name: 'kill',
	description: 'Kill mentioned users',
	execute(message, args) {
		console.log('mentions: ', message.mentions.users.size);
		if (!message.mentions.users.size) {
			message.channel.send('Mention the person you want to kill.');
		}
		else {
			const taggedUser = message.mentions.users.first();
			console.log('tagged user: ', taggedUser);
			if (taggedUser.id === '234249678328299520') {
				message.channel.send('You can\'t kill your nmaster');
			}
			else {
				message.channel.send(`${taggedUser.username} is already dead from inside.`);
			}
		}
	},
}
