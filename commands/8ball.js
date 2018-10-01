const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(args[2]) return message.reply("Escriba una pregunta.");
let replies = ["Si.", "No.", "No lo sé."];

let result = Math.floor((Math.random()* replies.length));
let question = args.slice(0).join("");

let ballembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#FF9900")
.addField("Pregunta", question)
.addField("Respuesta", replies[result]);

message.channel.send(ballembed);

} 
module.exports.help = {
    name: "8ball"
  }