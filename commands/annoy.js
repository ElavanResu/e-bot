module.exports = {
	name: 'annoy',
	description: 'Sends private messages to annoy mentioned user, with or without custom message',
	cooldown: 15,
	usage: '<mention user> <message (optional)>',
	args: true,
	execute(message, args) {
		if (!message.mentions.users.size) return message.channel.send('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.');
		if (!args[0].startsWith('<@')) return message.channel.send('Dumbo, whom are you trying to annoy? You need to mention someone to annoy.');
		if (args[1] === undefined) {
			message.mentions.users.map(user => {
				user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`);
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`Hue hue hue hue hue I am sent by ${message.author.username} to annoy you. YEET YEET YEET YEET`), 1500);
				}
			});
		} else {
			const msg = args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' ');
			message.mentions.users.map(user => {
				user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``);
				for (let counter = 0; counter < 9; counter++) {
					setTimeout(() => user.send(`**${message.author.username} sent me to annoy you with a message:**\n\`${msg}\``), 1500);
				}
			});
		}
	},
};
