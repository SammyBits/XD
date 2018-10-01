const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Info")
  .setColor("RANDOM")
  .setThumbnail(sicon)
  .addField("Nombre del Server", message.guild.name)
  .addField("Creado en", message.guild.createdAt)
  .addField("Usted se unió", message.member.joinedAt)
  .addField("Miembros totales", message.guild.memberCount);

  return message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
