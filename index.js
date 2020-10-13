/* eslint-disable brace-style */
// adding packages
const Discord = require('discord.js')
const fs = require('fs')
const { prefix, showNotification } = require('./config.json')
const { config } = require('dotenv')
const { initiateReactionAlgo } = require('./features/reactions')
const { logDeletedMessages } = require('./features/logs')
const badWordExterminator = require('./features/badWordExterminator')
const checkUserRestrictions = require('./features/checkUserRestrictions')
const logChats = require('./features/logChats')
const captureCustomEmojis = require('./features/captureCustomEmojis')
const { initialiseSpotifyServices } = require('./services/spotify')
// Creating client instance
const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()


client.on('messageDelete', async message => {
	if (!parseInt(process.env.DISABLELOGS)) {
		logDeletedMessages(message)
	}
})


// logging
client.on('ready', async () => {
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with your mum',
			type: 'PLAYING',
		},
	})
	try {
		await initialiseSpotifyServices()
	} catch (error) {
		console.log('Error in initialising spotify services: ', error)
	}
	console.log('Ready!', client.user.username)
})

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error)
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error)
})

const queue = new Map()

client.on('message', async message => {
	// Log cats and capture custom emojis
	if (process.env.NODE_ENV === 'production') {
		logChats(message)
		captureCustomEmojis(message)
	}

	// Restrict user
	if (message.channel.type === 'text' && await checkUserRestrictions(message)) {
		return null
	}

	// Bad word exterminator
	if (badWordExterminator(message)) {
		return null
	}

	// Reaction algo
	const userElavan = message.mentions.users.get('234249678328299520')
	try {
		initiateReactionAlgo(message)
	} catch (error) {
		console.log('Error in initiateReactionAlgo at index.js: ', error)
	}

	// ElavanResu not available feature
	if (showNotification && message.mentions.users.size && message.author.id !== '234249678328299520' && message.author.id !== '712367845572345977') {
		if (userElavan !== undefined) {
			if (userElavan.presence.status === 'offline') {
				message.reply('pardon my intrusion. My master, ElavanResu, is not available at the moment. He\'ll get back to you as soon as possibe.')
			}
		}
	}

	// Get the prefix and commands
	if (!message.content.slice(0, prefix.length).toLowerCase().startsWith(prefix) || (message.author.bot && (message.author.id !== '717421303614668841' && message.author.id !== '712367845572345977'))) return


	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()

	// Leave the guild
	if (commandName === 'leaveconfirm' && message.author.id === '234249678328299520') {
		message.channel.send('Good bye.')
		await message.guild.leave()
		return
	}

	// Create commands list
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

	if (!command) return

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`

		if (command.usage) {
			reply += `\nThe proper usage would be:\n> ${prefix}${command.name} ${command.usage}`
		}
		const cmdErrorEmbed = new Discord.MessageEmbed()
		.setColor('#A6011F')
		.setDescription(reply)
		return message.channel.send(cmdErrorEmbed)
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute the command inside DM.')
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection())
	}

	const now = Date.now()

	const timeStamps = cooldowns.get(command.name)

	const cooldownAmount = (command.cooldown || 3) * 1000

	if (timeStamps.has(message.author.id)) {
		const expirationTime = timeStamps.get(message.author.id) + cooldownAmount

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the '${command.name}' command.`)
		}
	} else {
		timeStamps.set(message.author.id, now)
		setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount)
	}

	const musicQueue = queue.get(message.guild.id)

	try {
		await command.execute(message, args, musicQueue, queue)
	} catch (error) {
		console.error(`Error in ||${commandName}|| command: `, error)
		message.reply(
			new Discord.MessageEmbed()
				.setColor('#A6011F')
				.setDescription('There was an error in executing the command.')
		)
	}
})

// log in to discord to make the bot online
if (process.env.NODE_ENV !== 'production') {
	config({
		path: __dirname + '/.env'
	})
}
client.login(process.env.TOKEN)
