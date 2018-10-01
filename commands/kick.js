const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!kUser) return message.channel.send("No puedo encontrar usuario!");
let kReason = args.join(" ").slice(22);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No se puede hacer amigo!");
if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("¡Esa persona no puede ser kickeada!");

let kickEmbed = new Discord.RichEmbed()
.setDescription("**~Kick~**")
.setColor("#e56b00")
.addField("User Kickeado", `${kUser} con ID ${kUser.id}`)
.addField("Kickeado Por", `<@${message.author.id}> con ID ${message.author.id}`)
.addField("Kickeado En", message.channel)
.addField("Hora", message.createdAt)
.addField("Razon", kReason);

let kickChannel = message.guild.channels.find(`name`, "incidents");
if(!kickChannel) return message.channel.send("No se puede encontrar el canal de incidentes.");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

}

module.exports.help = {
    name: "kick"
  }