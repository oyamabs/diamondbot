const Discord = require('discord.js');
const fs = require('fs');
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {
    // on regarde si un utilisateur est bien mentionné et si il a les permissions pour executer les commandes

    // si l'auteur n'a pas la permission de gérer le serveur (MANAGE_GUILD) on arrête l'éxecution de la commande
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas les persmissions d'effectuer cette commande.");

    // on crée la variable pour la mention
    let uReset = message.mentions.members.first();

    // si personne n'est mentionné on arrête la commande ou si l'argument n'est pas une mention
    if(args.length === 0 && args[0].startsWith("<@")) return message.reply("Merci de mentionner la personne dont vous voulez réinitialiser le compte");

    // on regarde si l'utilisateur mentionné existe bien dans db.json

    if(!db[uReset.id]) return message.reply(`Inutile de réinitialiser le compte de <@${uReset.id}> car ce compte n'existe pas dans la base de données de Diamond Bot`);

    // si la personne existe

    // creation du "fichier" temporaire
    let dbfile = db;

    if (dbfile[uReset.id]) {
        // reinit des variables de db.json sur le joueur
        dbfile[uReset.id].tokens = 500;
        dbfile[uReset.id].rp = 0;
        dbfile[uReset.id].nextWheel = "null";

        // ecriture du fichier
        write(dbfile)
    }

    message.channel.send("Compte réinitialisé avec succès ! :+1:")
}

module.exports.help = {
    name: "resetaccount"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}