/**
 * File: /Users/shubham/ElavanResu/asach-bot/commands/tag.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 12:38:30 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Jun 25 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
module.exports = {
  name: 'tag',
  description: 'Add, removes or lists tags',
  cooldown: 1,
	usage: '<add> | <remove> | <list>',
  args: true,
  guildOnly: true,
  async execute(message, args, tables) {
    console.log('adde')
    if (args[0] === 'add') {
      try {
        console.log('descroptipm: ', args.splice(1, args.length - 1).toString().replace(/[, ]+/g, ' '));
        const tag = await tables.tags.create({
          name: args[1],
          description: args.splice(2, args.length - 1).toString().replace(/[, ]+/g, ' '),
          username: message.author.username,
        });
        return message.reply(`Tag ${tag.name} added`);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return message.reply('That tag already exists.');
        }
        return message.reply('Something went wrong with adding a tag.');
      }
    } else if (args[0] === 'show') {
      const tag = await tables.tags.findOne({ where: { name: args[1] } });
      if (tag) {
        tag.increment('usage_count');
        return message.channel.send(tag.get('description'));
      }
      return message.reply(`Could not find tag: ${args[1]}`);
    }
  },
}