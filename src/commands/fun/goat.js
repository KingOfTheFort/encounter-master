const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class DogCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'goat',
      aliases: [],
      usage: 'dog',
      description: 'Finds a random dog for your viewing pleasure.',
      type: client.types.FUN
    });
  }
  async run(message) {
    try {
      const img = "https://placegoat.com/248/248";
      const embed = new MessageEmbed()
        .setTitle('Goat')
        .setImage(img)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
  }
};
