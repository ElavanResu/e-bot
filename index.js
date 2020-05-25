// adding packages
const Discord = require('discord.js');
const fs = require('fs');
const { prefix, showNotification } = require('./config.json');
// const { config } = require('dotenv');
const { initiateReactionAlgo } = require('./features/reactions');
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
client.on('ready', () => {
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with your mum',
			type: 'PLAYING',
		},
	});
	console.log('Ready!', client.user.username);
});

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.on('message', async message => {
	const userElavan = message.mentions.users.get('234249678328299520');
	try {
		await initiateReactionAlgo(message);
	} catch (error) {
		console.log('Error in initiateReactionAlgo at index.js: ', error);
	}
	// const userJaegar = message.mentions.users.get('427000717681885185');
	// const matchedElavanWords = message.content.toLowerCase().match(/elavan|elavanresu|resu|navale|shubham/g);
	// const matchedJaegarWords = message.content.toLowerCase().match(/jaegar|gulkand|gulkandkush|jae/g);
	// const elavanConfirm = (userElavan !== undefined || matchedElavanWords !== null) && message.author.id !== '712367845572345977';
	// const jaegarConfirm = (userJaegar !== undefined || matchedJaegarWords !== null);
	// if (elavanConfirm) {
	// 	try {
	// 		await message.react('🇪');
	// 		await message.react('🇱');
	// 		await message.react('🅰️');
	// 		await message.react('🇻');
	// 		await message.react('🇦');
	// 		await message.react('🇳');
	// 	} catch (error) {
	// 		console.error('One of the emojis failed to react');
	// 	}
	// }

	// // Pushkie reaction
	// if (!elavanConfirm && message.author.id === '686973497250938929') {
	// 	try {
	// 		await message.react('💰');
	// 	} catch (error) {
	// 		console.error('One of the emojis failed to react');
	// 	}
	// }

	// // Ponder reaction
	// if (!elavanConfirm && message.author.id === '213519729296539648') {
	// 	try {
	// 		await message.react('🍔');
	// 	} catch (error) {
	// 		console.error('One of the emojis failed to react');
	// 	}
	// }

	// // Jaegar reaction
	// if (!elavanConfirm && (jaegarConfirm || message.author.id === '427000717681885185')) {
	// 	try {
	// 		await await message.react('🏳️‍🌈');
	// 	} catch (error) {
	// 		console.error('One of the meojis failed to react');
	// 	}
	// }

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
	console.log('command1: ', commandName);
	if (commandName === 'leaveconfirm' && message.author.id === '234249678328299520') {
		message.channel.send('Good bye.');
		await message.guild.leave();
		return;
	}

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
// config({
// 	path: __dirname + '/.env'
// });
client.login(process.env.token);
