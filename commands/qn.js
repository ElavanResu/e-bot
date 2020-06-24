module.exports = {
	name: 'qn',
	description: 'Asks question to bot',
	usage: '<question>',
	guildOnly: true,
	execute(message, args) {
		if (!args.length) return message.channel.send('Provide one question.');
		const question = args.splice(0, args.length).toString().toLowerCase().replace(/[, ]+/g, ' ');
		if (question.length > 0 && question === 'how are you?') {
			message.channel.send('I am fine.');
		}
		if (question.length > 0 && question === 'am i loosing brain cells?') {
			message.channel.send('Yes.');
		}
		if (question.length > 0 && question === 'what should i do?') {
			message.channel.send('Just fly away my master.');
		}
	},
};
