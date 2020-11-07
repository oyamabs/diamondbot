const Discord = require('discord.js');
const fs = require("fs");
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {
    // VARIABLES RACCOURCI
    let dbfile = db;
    let author = message.author.id;
    
    // on regarde si l'utilisateur n'a pas déjà un compte
    if (!dbfile[author]) return message.reply("Vous n'avez pas de compte ! Veuillez en créer un avec la commande `d!createaccount`");

    // si l'utilisateur a déjà utilisé la commande
    if(dbfile[author]){
        // on crée une variable datenow qui prend la date et l'heure actuelle et on importe la date de prochain tour de roue
        let dateNow = new Date();
        let nextDailyJSON = new Date(dbfile[author].nextDaily);

        // si le joueur a déjà tourné la roue on lui indique aussi l'heure à laquelle il pourra à nouveau la tourner
        if (dateNow < nextDailyJSON) return message.reply("Vous avez déjà obtenu vos jetons quotidiens, vous pourrez les demander de nouveau demain à " + nextDailyJSON.getHours() + ":" + nextDailyJSON.getMinutes());
    }

    // on ajoute les jetons au compte
    dbfile[author].tokens += 500;

    // on met une date pour nextDaily
    let nextDailyDate = new Date();
    nextDailyDate.setDate(nextDailyDate.getDate() + 1);

    dbfile[author].nextDaily = nextDailyDate.toISOString();
 
    write(dbfile);

    message.reply("Vos 500 jetons quotidiens ont étés ajoutés à votre compte. A demain :wink:.");
    
}

module.exports.help = {
    name: "daily"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}