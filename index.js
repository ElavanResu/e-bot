// adding packages
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token, showNotification } = require('./config.json');
// Creating client instance
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
// logging
client.once('ready', () => {
	console.log('Ready!');
});

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('message', async message => {

	const userElavan = message.mentions.users.get('234249678328299520');
	const matchedWords = message.content.toLowerCase().match(/elavan|elavanresu|resu|navale|shubham/g);
	if ((userElavan !== undefined || matchedWords !== null) && message.author.id !== '712367845572345977') {
		try {
			await message.react('🇪');
			await message.react('🇱');
			await message.react('🅰️');
			await message.react('🇻');
			await message.react('🇦');
			await message.react('🇳');
		} catch (error) {
			console.error('One of the emojis failed to react');
		}
	}



	if (showNotification && message.mentions.users.size && message.author.id !== '234249678328299520' && message.author.id !== '712367845572345977') {
		if (userElavan !== undefined) {
			if (userElavan.presence.status === 'offline') {
				message.reply('pardon my intrusion. My master, ElavanResu, is not available at the moment. He\'ll get back to you as soon as possibe.');
			}
		}
	}
	console.log(message.content);
	if (!message.content.slice(0, prefix.length).toLowerCase().startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	console.log('args: ', args);
	const commandName = args.shift().toLowerCase();
	console.log('command: ', commandName);

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be:\n> ${prefix}${command.name} ${command.usage}`;
		}

		return message.channel.send(reply);
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute the command inside DM.');
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	console.log('now: ', now);
	
	const timeStamps = cooldowns.get(command.name);
	console.log('timeStamps: ', JSON.stringify(timeStamps));

	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timeStamps.has(message.author.id)) {
		const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the '${command.name}' command.`);
		}
	} else {
		timeStamps.set(message.author.id, now);
		setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(`Error in ||${commandName}|| command: `, error);
		message.reply('There was an error in executing the command.');
	}
});

// log in to discord to make the bot online
client.login(token);


// if (command === 'intro') {
// 	message.channel.send('Hi, I am a slave of ElavanResu.');
// }
// else if (command === 'server') {
// 	message.channel.send(`This server is: ${message.guild.name}`);
// }
// else if (command === 'kill') {
// 	console.log('mentions: ', message.mentions.users.size);
// 	if (!message.mentions.users.size) {
// 		message.channel.send('Mention the person you want to kill.');
// 	}
// 	else {
// 		const taggedUser = message.mentions.users.first();
// 		console.log('tagged user: ', taggedUser);
// 		if (taggedUser.id === '234249678328299520') {
// 			message.channel.send('You can\'t kill your nmaster');
// 		}
// 		else {
// 			message.channel.send(`${taggedUser.username} is already dead from inside.`);
// 		}
// 	}
// }
// else if (command === 'avatar') {
// 	if (!message.mentions.users.size) {
// 		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
// 	}

// 	const avatarList = message.mentions.users.map(user => {
// 		return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
// 	});

// 	message.channel.send(avatarList);
// }
// else if (command === 'prune') {
// 	console.log('args: ', args);
// 	const amount = parseInt(args[0]) + 1;

// 	if (isNaN(amount)) {
// 		return message.reply('Please enter a valid number betweeb 2 to 50');
// 	}
// 	else if (amount < 2 || amount > 50) {
// 		return message.reply('Please enter a alue between 2 to 50');
// 	}
// 	console.log('amount: ', amount);
// 	message.channel.bulkDelete(amount, true).catch(error => {
// 		console.log('error in bulk delete: ', error);
// 		message.channel.send('There was an error trying to prune messages');
// 	});

// }
// else if (command === 'gn') {
// 	if (!message.mentions.users.size && message.author.id === '234249678328299520') {
// 		return message.channel.send('Good night my master.');
// 	}
// 	else if (!message.mentions.users.size) {
// 		return message.channel.send('Good night mate.');
// 	}
// 	const taggedUser = message.mentions.users.first();
// 	if (taggedUser.id === '234249678328299520') {
// 		return message.channel.send(`Good night Master ${taggedUser}. Sweet dreams.`);
// 	}
// 	message.channel.send(`Good night ${taggedUser}. Sweet Dreams.`);
// }
// else if ( && message.content === 'slv why people bully me?') {
// 	message.channel.send('Because they are jealous of you.');
// }
// else if (message.author.id === '234249678328299520' && message.content === 'slv good slave') {
// 	message.channel.send('You are a good master.');
// }
// else if (message.author.id === '234249678328299520' && message.content === 'slv come') {
// 	message.channel.send('Your wish is my command, Master ElavanResu');
// }
// else if (message.content === 'slv Who\'s ElavanResu?') {
// 	message.channel.send('My master.');
// }
// else if (message.content === 'slv Who\'s Molten?') {
// 	message.channel.send('A gay.');
// }
// else if (message.content === 'slv Who\'s Arjun?') {
// 	message.channel.send('A nice riceman.');
// }
// else if (message.content === 'slv Who\'s Simon?') {
// 	message.channel.send('A gay kid.');
// }
// else if (message.content === 'slv Who\'s Jaegar?') {
// 	message.channel.send('A shemale.');
// }
// else if (message.content === 'slv Who\'s Clover?') {
// 	message.channel.send('A smol catto.');
// }
// else if (message.content === 'slv Who\'s QuarterPounder?') {
// 	message.channel.send('A sugoi burger.');
// }
// else if (message.author.id === '234249678328299520' && message.content === 'slv ping') {
// 	message.channel.send('Pong.');
// }
// else if (message.content === 'slv ping') {
// 	message.channel.send('Pong biatch!!!');
// }
// else if (message.content === 'slv What Jaegar is feeling?') {
// 	message.channel.send('Only pain');
// }
// else if (message.content === 'slv what should I do?') {
// 	message.channel.send('Just fly away.');
// }
// else if (message.content === 'slv am I loosing brain cells?') {
// 	message.channel.send('Yes, everyday.');
// }
// else if (message.content === 'slv Who\'s Dhruv?') {
// 	message.channel.send('A fungus.');
// }
// else if (message.author.id === '234249678328299520' && message.content === 'slv start') {
// 	message.channel.send('pls beg');
// }
// else if (message.author.id === '234249678328299520' && message.content === 'slv bye') {
// 	message.channel.send('Take care master.');
// }
// else if (message.content === 'slv bye') {
// 	message.channel.send('Bye.');
// }
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