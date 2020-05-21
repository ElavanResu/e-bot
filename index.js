// adding packages
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// Creating client instance
const client = new Discord.Client();

// logging
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.mentions.users.size && message.author.id !== '234249678328299520') {
		const userElavan = message.mentions.users.get('234249678328299520');
		if (userElavan !== undefined) {
			if (userElavan.presence.status === 'offline') {
				message.reply('my master, ElavanResu, is not available at the moment. He\'ll get back to you as soon as possibe.');
			}
		}
	}
	console.log(message.content);
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	console.log('args: ', args);
	const command = args.shift().toLowerCase();
	console.log('command: ', command);

	if (command === 'intro') {
		message.channel.send('Hi, I am a slave of ElavanResu.');
	}
	else if (command === 'server') {
		message.channel.send(`This server is: ${message.guild.name}`);
	}
	else if (command === 'kill') {
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
	}
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	}
	else if (command === 'prune') {
		console.log('args: ', args);
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Please enter a valid number betweeb 2 to 50');
		}
		else if (amount < 2 || amount > 50) {
			return message.reply('Please enter a alue between 2 to 50');
		}
		console.log('amount: ', amount);
		message.channel.bulkDelete(amount, true).catch(error => {
			console.log('error in bulk delete: ', error);
			message.channel.send('There was an error trying to prune messages');
		});

	}
	else if (command === 'gn') {
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
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv why people bully me?') {
		message.channel.send('Because they are jealous of you.');
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv good slave') {
		message.channel.send('You are a good master.');
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv come') {
		message.channel.send('Your wish is my command, Master ElavanResu');
	}
	else if (message.content === 'slv Who\'s ElavanResu?') {
		message.channel.send('My master.');
	}
	else if (message.content === 'slv Who\'s Molten?') {
		message.channel.send('A gay.');
	}
	else if (message.content === 'slv Who\'s Arjun?') {
		message.channel.send('A nice riceman.');
	}
	else if (message.content === 'slv Who\'s Simon?') {
		message.channel.send('A gay kid.');
	}
	else if (message.content === 'slv Who\'s Jaegar?') {
		message.channel.send('A shemale.');
	}
	else if (message.content === 'slv Who\'s Clover?') {
		message.channel.send('A smol catto.');
	}
	else if (message.content === 'slv Who\'s QuarterPounder?') {
		message.channel.send('A sugoi burger.');
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv ping') {
		message.channel.send('Pong.');
	}
	else if (message.content === 'slv ping') {
		message.channel.send('Pong biatch!!!');
	}
	else if (message.content === 'slv What Jaegar is feeling?') {
		message.channel.send('Only pain');
	}
	else if (message.content === 'slv what should I do?') {
		message.channel.send('Just fly away.');
	}
	else if (message.content === 'slv am I loosing brain cells?') {
		message.channel.send('Yes, everyday.');
	}
	else if (message.content === 'slv Who\'s Dhruv?') {
		message.channel.send('A fungus.');
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv start') {
		message.channel.send('pls beg');
	}
	else if (message.author.id === '234249678328299520' && message.content === 'slv bye') {
		message.channel.send('Take care master.');
	}
	else if (message.content === 'slv bye') {
		message.channel.send('Bye.');
	}
	// console.log(JSON.stringify(message));
	// console.log(Object.keys(message))
	// console.log('author: ', message.author.id)
	// console.log(message.author.id === '234249678328299520');
	// console.log('Last message: ', message.author.lastMessage)
	// if (message.author.id === '234249678328299520' && message.content === 'Slave!') {
	//   message.channel.send('Your wish is my command, Master ElavanResu');
	// }
	// if (message.content === 'Slave! Who\'s ElavanResu?') {
	//   message.channel.send('My master.');
	// } else if (message.content === 'Slave! Who\'s Molten?') {
	//   message.channel.send('A gay.')
	// } else if (message.content === 'Slave! Who\'s Arjun?') {
	//   message.channel.send('A nice riceman.')
	// } else if (message.content === 'Slave! Who\'s Simon?') {
	//   message.channel.send('A gay kid.')
	// } else if (message.content === 'Slave! Who\'s Jaegar?') {
	//   message.channel.send('A shemale.')
	// } else if (message.author.id === '234249678328299520' && (message.content.startsWith(`${prefix}Hi`) || message.content.startsWith(`${prefix}hi`))) {
	//   message.channel.send('Hello Master!')
	// } else if (message.content.startsWith(`${prefix}Hi`) || message.content.startsWith(`${prefix}hi`)) {
	//   message.channel.send('Hello. I am ElavanResu\'s bot.')
	// } else if (message.author.id === '234249678328299520' && message.content === `${prefix}ping`) {
	//   message.channel.send('Pong.')
	// } else if (message.content === `${prefix}ping`) {
	//   message.channel.send('Pong biatch!!!')
	// } else if (message.content === `${prefix}server`) {
	//   message.channel.send(`This server is: ${message.guild.name}`)
	// } else if (message.content === `Slave! What Jaegar is feeling?`) {
	//   message.channel.send('Only pain')
	// } else if (message.content === `slv what should I do?`) {
	//   message.channel.send('Just fly away.')
	// } else if (message.content === `slv am I loosing brain cells?`) {
	//   message.channel.send('Yes, everyday.')
	// } else if (message.content === 'Slave! Who\'s Dhruv?') {
	//   message.channel.send('A fungus.')
	// } else if (message.author.id === '234249678328299520' && message.content === 'slv start') {
	//   message.channel.send('pls beg')
	// }
});

// log in to discord to make the bot online
client.login(token);