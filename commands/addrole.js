const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("No pude encontrar ese usuario, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("¡Especifica un rol!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("No pude encontrar ese rol.");

  if(rMember.roles.has(gRole.id)) return message.reply("Ellos ya tienen ese rol.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Felicidades, te han dado el rol ${gRole.name}`)
  }catch(e){
    message.channel.send(`Felicitaciones a <@${rMember.id}>, se les ha dado el rol ${gRole.name}. Intentamos con ellos, pero sus DM están bloqueado.`)
  }
}

module.exports.help = {
  name: "addrole"
}