const Discord = require('discord.js');
const db = require("../db.json");
const fs = require("fs");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    let dbfile = db;
    let author = message.author.id;

    if (!dbfile[author]) return message.reply("Vous n'avez pas de compte ! Veuillez en créer un avec la commande `d!createaccount`");

    const newEmbed = new Discord.MessageEmbed()
    .setAuthor("Diamond Bot", bot.user.avatarURL())
    .setColor("#ffffff")
    .setTitle(`Informations sur le compte de ${message.author.username}`)
    .addField("Jetons :", dbfile[author].tokens)
    .addField("RP :", dbfile[author].rp)
    .addField("Prochain tour de roue :",  new Date(dbfile[author].nextWheel).toString())
    .addField("Prochaine récupération des jetons quotidiens :", new Date(dbfile[author].nexyDaily))

    message.channel.send(newEmbed);
}

module.exports.help = {
    name: "accountinfo"
}

function write(file) {
    fs.writeFile("./db.json", JSON.stringify(file), (err) => {
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}