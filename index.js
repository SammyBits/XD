const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} cargando!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} esta online en ${bot.guilds.size} servers!`);
  bot.user.setActivity("TESTBOT", {type: "WATCHING"});

});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} A entrado al server`)

  let welcomechannel = member.guild.channels.find(`name`, "bienvenida")
  welcomechannel.send(`¡MIRAD A TODOS! ${member} se ha unido a la fiesta!`);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} A salido del server`)

  let welcomechannel = member.guild.channels.find(`name`, "bienvenida")
  welcomechannel.send(`Vete con viento fresco! ${member} ha rescatado en el servidor!`);
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = process.env.PREFIX;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(tokenfile.token);