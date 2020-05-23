module.exports = {
	name: 'args-info',
	description: 'Ping!',
	args: true,
	usage: '<arguments>',
	guildOnly: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};
