const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("No puedo encontrar usuario!");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No se puede hacer amigo!");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("¡Esa persona no puede ser kickeada!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("**~Ban~**")
  .setColor("RANDOM")
  .addField("User Baneado", `${bUser} con ID ${bUser.id}`)
  .addField("Baneado Por", `<@${message.author.id}> con ID ${message.author.id}`)
  .addField("Baneado En", message.channel)
  .addField("Hora", message.createdAt)
  .addField("Razon", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentchannel) return message.channel.send("¡Esa persona no puede ser kickeada!");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);
  
}

module.exports.help = {
  name:"ban"
}