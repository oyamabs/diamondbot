const Discord = require('discord.js');
const fs = require("fs");
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {

        // prise en charge du fichier db
        let dbfile = db;
        let author = message.author.id;

        // si le joueur n'a pas de compte
        if (!dbfile[author]) return message.reply("Vous n'avez pas de compte ! Veuillez en créer un avec la commande `d!createaccount`");

        // prise en charge des différents cas d'erreur
        /*
            moins de deux arguments
            premier argument mauvais
            mise inférieure a 100 tokens
        */

        if (args.lenght < 2) return message.reply("Mauvais usage de la commande : `d!roulette <red | black> <mise (supérieure ou égale à 100 jetons)>`");
        if (args[0] != "red" && args[0] != "black") return message.reply("Mauvais usage de la commande : `d!roulette <red | black> <mise (supérieure ou égale à 100 jetons)>`");
        if (args[1] < 100 || args[1] > dbfile[author].tokens || args[1] < 1) return message.reply("La mise doit être supérieure ou égale à 100 jetons et vous ne pouvez pas miser plus que ce que vous avez (la maison ne fait pas crédit) !");

        if(!Number(args[1])) return message.reply("Mauvais argument, la mise doit être un nombre");

        // sauvegarde du resultat de la roulette
        let resultRoulette = rouletteTurn();

        if(resultRoulette < 50 && args[0] == "red") {
            message.reply("Vous avez gagné ! Vous emportez le double de votre mise et des rp !");

            // ajout du gain
            dbfile[author].rp += 100; // ajout de 100 rp sur le compte
            dbfile[author].tokens += args[1]*2; // ajout du gain
            write(dbfile); // écriture du fichier
        } else if (resultRoulette > 50 && args[0] == "black") {
            message.reply("Vous avez gagné ! Vous emportez le double de votre mise !");

            // ajout du gain
            dbfile[author].rp += 100; // ajout de 100 rp sur le compte
            dbfile[author].tokens += args[1]*2; // ajout du gain
            write(dbfile); // écriture du fichier
        } else {
            message.reply("Vous avez perdu ! Dommage, mais vous pouvez retenter !");
            dbfile[author].tokens -= args[1];
            write(dbfile); // écriture du ficher db
        }
}

module.exports.help = {
    name: "roulette"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}

function badUsage () { message.reply("Mauvais usage de la commande ! `d!roulette <mise (en jetons)> <couleur (noir ou rouge)>`") }

function rouletteTurn () {
    let roulette = Math.floor(Math.random() * 100); // roulette ; si inférieur a 50 = noir ; si supérieur à 50 = rouge ; si égal à 50 refais un tour
    if (roulette == 50) { rouletteTurn(); }

    return roulette;
}