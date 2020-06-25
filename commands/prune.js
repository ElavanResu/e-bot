module.exports = {
	name: 'prune',
	description: 'Deletes messages by taking the number of messages to delete from 2 to 50',
	guildOnly: true,
	execute(message, args) {
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
	},
};
