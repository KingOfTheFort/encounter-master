const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const moment = require('moment');
const { owner } = require('../../utils/emojis.json');
const { oneLine } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Fetches Encounter\'s information and statistics.',
      type: client.types.INFO
    });
  }
  run(message) {
    const botOwner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
    const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
    const embed = new MessageEmbed()
      .setTitle('Encounter\'s Bot Information')
      .setThumbnail('https://media.discordapp.net/attachments/886702874002882585/888219167717732362/cooltext393253671747474.jpg')
      .setDescription(oneLine`
        The Encounter discord bot.
      `)
      .addField('Username', message.client.user.username, true)
      .addField('Discriminator', `\`#${message.client.user.discriminator}\``, true)
      .addField('ID', `\`${message.client.user.id}\``, true)
      .addField('Nickname', (message.guild.me.nickname) ? message.guild.me.nickname : '`None`', true)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Detected Users', `\`${message.client.users.cache.size - 1}\``, true)
      .addField('Servers', `\`${message.client.guilds.cache.size}\``, true)
      .addField(`Owner ${owner}`, botOwner, true)
      .addField('Uptime', `\`${days}\` and \`${hours}\``, true)
      .addField('Current Version', `\`${pkg.version}\``, true)
      .addField('Library/Environment', 'Discord.js 12.2.0\nNode.js 12.16.3', true)
      .addField('Database', 'SQLite', true)
      .addField(
        'Links', 
        '[Invite Me](https://discord.com/oauth2/authorize?client_id=888216262424014868&permissions=8&scope=bot)'
        
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
