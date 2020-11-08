const checkAndUpdatePerms = require('../features/checkAndUpdatePerms')
const Discord = require('discord.js')

module.exports = {
	name: 'prune',
	description: 'Deletes messages by taking the number of messages to delete from 2 to infinity',
	guildOnly: true,
	async execute(message, args) {
		if (!await checkAndUpdatePerms(message.author.id, message.guild.id, 'prune')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setColor('#A6011F')
					.setDescription(`Sorry, you are not allowed to use this feature, contact the owner`)
			)
		}
		console.log('args: ', args)
		const amount = parseInt(args[0]) + 1

		if (isNaN(amount)) {
			return message.reply('Please enter a valid number betweeb 2 to 50')
		}
		else if (amount < 2) {
			return message.reply('Please enter a value between 2 to infinity')
		}
		console.log('amount: ', amount)
		message.channel.bulkDelete(amount, true).catch(error => {
			console.log('error in bulk delete: ', error)
			message.channel.send('There was an error trying to prune messages')
		})
	}
}
