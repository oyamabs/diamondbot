const Discord = require('discord.js');
const db = require("../db.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    // on regarde si l'user a un "compte"
    // si oui on vérifie tout de suite si il n'a pas déjà tourné la roue
    // si non on lui crée un compte et ENSUITE on tourne la roue

    let dbfile = db;
    let author = message.author.id

    // si l'utilisateur a un compte
    if(dbfile[author]){
        // on crée une variable datenow qui prend la date et l'heure actuelle et on importe la date de prochain tour de roue
        let dateNow = new Date();
        let nextWheelJSON = new Date(dbfile[author].nextWheel);

        // si le joueur a déjà tourné la roue on lui indique aussi l'heure à laquelle il pourra à nouveau la tourner
        if (dateNow < nextWheelJSON) return message.reply("Vous avez déjà tourné la roue, vous ne pourrez la tourner que demain à " + nextWheelJSON.getHours() + ":" + nextWheelJSON.getMinutes());

    }


    if (!dbfile[author]) return message.reply("Vous n'avez pas de compte ! Veuillez en créer un avec la commande `d!createaccount`");

    // on vérifie si il n'a pas déjà tourné la roue

    

    // tour de roue

    let wheel = Math.floor(Math.random() * 100) + 1;

    if(wheel < 5) {
        // PRIX SPECIAL

        // message + ajout des valeurs
        message.reply("PRIX SPECIAL !!! En attendant que le dev se bouge le cul à trouver une vraie idée pour le prix spécial vous remportez 10 000 jetons, 10 000 RP et un bisou du dev ! 💗");
        dbfile[author].tokens += 10000;
        dbfile[author].rp += 10000;
        
        // ecriture du fichier
        write(dbfile)

    } else if (wheel >= 5 && wheel < 28) {
        // PRIX RP 1

        // message + ajout des rp
        message.reply("Prix rp 1 (500 RP)");
        dbfile[author].rp += 500;
        
        // écriture du fichier
        write(dbfile)

    } else if (wheel >= 28 && wheel < 50) {
        // PRIX RP 2

        // message + ajout des rp
        message.reply("Prix rp 2 (1000 RP)");
        dbfile[author].rp += 1000;

        // ecriture du fichier
        write(dbfile)

    } else if (wheel >= 50 && wheel < 75) {
        // PRIX JETONS 1

        // message + ajout des jetons
        message.reply("Prix jetons 1 (500 jetons)");
        dbfile[author].tokens += 500

        // ecriture du fichier
        write(dbfile)

    } else {
        // PRIX JETONS 2

        // message + ajout des jetons
        message.reply("Prix jetons 2 (5000 jetons)")
        dbfile[author].tokens += 5000;

        // ecriture du fichier
        write(dbfile)
    }

    // on valide le tour
    let nextWheel = new Date();
    nextWheel.setDate(nextWheel.getDate() + 1);

    dbfile[author].nextWheel = nextWheel.toISOString();
 
    write(dbfile)

}

module.exports.help = {
    name: "fortune"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}