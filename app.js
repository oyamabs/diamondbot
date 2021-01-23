const fs = require("fs");
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
// création et configuration du bot
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

// couleur des embeds : #fffff

// event de vérification de l'état du bot
bot.on("ready", async () => {
    let isOnDev = botconfig.isDev ? "d!help (en developpement 🔨)" : "d!help"; // si botconfig.isDev == true ; on précise dans le status du bot qu'il est en dev

    console.log(`\n${botconfig.name} est en ligne !`)
    bot.user.setActivity(isOnDev, { type: "PLAYING" })
})

// initialisation des commandes
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Je ne trouve pas les commandes");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} chargé`)
        bot.commands.set(props.help.name, props)
    })
})

// lecture des commandes
bot.on("message", message => {
    if (message.author.bot) return;
    let mess = message.content.toLowerCase()
    if (message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;

    if(!mess.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length))
    if (commandfile) commandfile.run(bot, message, args);
});

// mise en ligne du bot

bot.login(botconfig.token);