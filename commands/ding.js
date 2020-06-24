module.exports = {
	name: 'ding',
	description: 'Ding!',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Dong.');
	},
};
