const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No puedes hacer eso.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("No pude encontrarlos yo");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> tiene ${warnlevel} advertencias.`);

}

module.exports.help = {
  name: "warnlevel"
}