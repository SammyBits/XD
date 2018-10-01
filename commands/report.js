const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("No se pudo encontrar usuario");
        let reason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reportes")
        .setColor("RANDOM")
        .addField("User Reportado", `${rUser} con ID: ${rUser.id}`)
        .addField("Reportado Por", `${message.author} con ID: ${message.author.id}`)
        .addField("Canal", message.channel)
        .addField("Hora", message.createdAt)
        .addField("Razon", reason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("No se pudo encontrar el canal de informes.");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
      }
 
module.exports.help = {
  name: "report"
}


