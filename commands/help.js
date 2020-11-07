const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const helpembed = new Discord.MessageEmbed()
        .setAuthor("Diamond Bot", bot.user.avatarURL())
        .setColor("#ffffff")
        .setTitle(`Help`)
        .addFields(
            { name: "Prefix :", value: "d!" },
            { name: "Syntaxe :", value: "d!commande <argument obligatoire> [argument facultatif]" },
            { name: "Commandes modération : ", value: "`d!resetaccount <utilisateur>`" },
            { name: "Commandes relatives aux comptes :", value: "`d!accountinfo`, `d!createaccount`" },
            { name: "Commandes de jeux : ", value: "`d!fortune`, `d!roulette <red | black> <mise (supérieure ou égale à 100)>`, `d!coinflip <mise (inférieure à 50)>`" },
            { name: "Commandes autre : ", value: "`d!ping`" }
        )

        message.channel.send(helpembed);
}

module.exports.help = {
    name: "help"
}