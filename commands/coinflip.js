const Discord = require('discord.js');
const fs = require("fs");
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {

        // prise en charge du fichier db
        let dbfile = db;
        let author = message.author.id;

        // si le joueur n'a pas de compte
        if (!dbfile[author]) return message.reply("Vous n'avez pas de compte ! Veuillez en créer un avec la commande `d!createaccount`");
        if(args.length < 1 || args[0] > 50 || args[0] < 1 || args[0] > dbfile[author].tokens) return message.reply("Mauvais usage de la commande ! `d!coinflip <mise (inférieure à 50)> et vous ne pouvez pas miser plus que ce que vous avez (la maison ne fait plus crédit) !`");

        if(!Number(args[0])) return message.reply("Mauvais argument, la mise doit être un nombre");

        let coin = Math.floor(Math.random() * 2);

        let winning = Number(args[0])+10;

        if (coin == 0) {
            message.reply("Vous avez gagné ! Vous remportez votre mise + 10 jetons");


            dbfile[author].tokens += winning;
            write(dbfile);
        } else {
            message.reply("Vous avez perdu ! Mais vous pouvez retenter !");

            dbfile[author].tokens -= args[0];
            write(dbfile);
        }

}

module.exports.help = {
    name: "coinflip"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}

function badUsage () { message.reply("Mauvais usage de la commande ! `d!roulette <mise (en jetons)> <couleur (noir ou rouge)>`") }