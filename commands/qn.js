module.exports = {
	name: 'qn',
	description: 'Asks question to bot',
	usage: '<question>',
	execute(message, args) {
		if (!args.length) return message.channel.send('Provide one question.');
		const question = args.splice(1, args.length - 1).toString().toLowerCase().replace(/[, ]+/g, ' ');
		if (question.length > 0 && question === 'how are you?') {
			message.channel.send('I am fine.');
		}
	},
};
