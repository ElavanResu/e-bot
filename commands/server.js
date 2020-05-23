module.exports = {
	name: 'server',
	description: 'Gives server info',
	execute (message, args) {
		message.channel.send(`This server is: ${message.guild.name}`);
	},
};
