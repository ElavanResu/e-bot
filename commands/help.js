const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'List all commands or info about a specific command',
  alaises: ['commands'],
  usage: '<command name>',
  cooldown: 5,
  execute (message, args) {
    const data = [];
    const { commands } = message.client;
    if (!args.length) {
      data.push(`Here's a list of all my commands:`);
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nTou can send \`${prefix}help [command name]\` to get info on a specific command`);

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply(`I've sent yoyu a DM with all my commands!`);
        })
        .catch (error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`);
          message.reply(`It seems like I can't DM you! Do you have DM s disabled?`);
        });
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(cmd => cmd.alaises && cmd.alaises.includes(name));

    if (!command) {
      return message.reply(`That's not a valid command`);
    }

    data.push(`**Name:** ${command.name}`);
    
    if (command.alaises) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  },
};
