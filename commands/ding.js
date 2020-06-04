module.exports = {
	name: 'ding',
	description: 'Ding!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Dong.');
	},
};
