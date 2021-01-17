const Discord = require('discord.js');
const fs = require("fs");
const db = require("../db.json");

module.exports.run = async (bot, message, args) => {
	let dbfile = db;

	// on regarde si l'utilisateur à les droits pour faire cette commande
	if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous n'avez pas les persmissions d'effectuer cette commande.");

	// on regarde les arguments si ils sont valides
	let sUser = message.mentions.members.first(); // mention de l'utilisateur
	let tokensToAdd = args[1]; // nombre de tokens à ajouter
	if (args.length < 2 || !Number(args[1]) || !args[0].startsWith("<@")) return message.reply("Mauvais usage de la commande ! `d!addtokens <@mention> <nbr de jetons à ajouter pour l'utilisateur>`");


	// on set le nombre de tokens
	dbfile[sUser.id].tokens += Number(Math.floor(tokensToAdd));
	write(dbfile); // on écrit le fichier

	// on signale que le nombre à été modifié
	message.reply(`${Math.floor(tokensToAdd)} jetons ont étés ajoutés à <@${sUser.id}> ! :wink:`);
}

module.exports.help = {
	name: "addtokens"
}

function write(file) {
	fs.writeFile("./db.json", JSON.stringify(file), (err) => {
		if (err) message.reply("Il y a eu une erreur ! " + err);
	});
}