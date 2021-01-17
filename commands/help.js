const Discord = require("discord.js");
const config = require("../config.json")

module.exports.execute = async (client, message, args, prefix) =>{
    
    
        let help = new Discord.MessageEmbed()
            .setFooter(config.footer, config.footericon)
    message.channel.send(help)
    message.delete()
    
}

module.exports.help = {
    name: "help",
    description:"help",
    aliases:['elp']
}