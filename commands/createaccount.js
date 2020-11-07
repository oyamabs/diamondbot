const Discord = require('discord.js');
const fs = require("fs");
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {
    // VARIABLES RACCOURCI
    let dbfile = db;
    let author = message.author.id;
    
    // on regarde si l'utilisateur n'a pas déjà un compte
    if(dbfile[author]) return message.reply("Vous possédez déjà un compte, si vous voulez réinitialiser votre compte demandez a un administrateur de le faire");

    dbfile[author] = {tokens: 500, rp: 0, nextWheel: null, nextDaily: null };

    write(dbfile);

    message.channel.send("Compte crée avec succès ! :+1:");
    
}

module.exports.help = {
    name: "createaccount"
}

function write(file){
    fs.writeFile("./db.json", JSON.stringify(file), (err) => { 
        if (err) message.reply("Il y a eu une erreur ! " + err);
    });
}