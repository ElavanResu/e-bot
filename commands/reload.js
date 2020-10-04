/* eslint-disable brace-style */
const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'reload',
	aliases: ['rld'],
	description: 'Reload a command',
	args: true,
	async execute(message, args) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'reload_cmd')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		const commandName = args[0].toLowerCase()
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

		if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`)

		delete require.cache[require.resolve(`./${commandName}.js`)]

		try {
			const newCommand = require(`./${commandName}.js`)
			message.client.commands.set(commandName, newCommand)
		} catch (error) {
			console.log(error)
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
		}

		message.channel.send(`Command \`${command.name}\` was reloaded!`)
	}
}