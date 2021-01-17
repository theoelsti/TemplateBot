//--------->SETUP<---------\\
const Discord = require("discord.js");
const {Client, Util} = require("discord.js");
const embed = new Discord.MessageEmbed();
const client = new Discord.Client({disableEveryone: true})
client.commands = new Discord.Collection();
//--------->ADDONS<---------\\
const fs = require("fs");
const https = require("https");
const {get} = require("snekfetch");
const snekfetch = require("snekfetch");

const chalk = require("chalk");

const config = require("./config.json")
const token = require('./token.json')
fs.readdir("./commands/", (err, files) => {

    if(err) console.log(chalk.redBright(err))
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log(chalk.redBright("Couldn't find commands."));
        return;
    }
    jsfile.forEach((f,i)=>{
        let props = require(`./commands/${f}`);
        console.log(chalk.yellow(`${f} loaded.`))
        client.commands.set(props.help.name, props);
    })
    
    })

client.on("ready", () => {
console.log(chalk.greenBright("Succesfully logged in !"));
});

client.on("message", async message => {

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let sender = message.author;
    let guild = message.guild;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (command){
        command.execute(client, message, args, prefix);
    }


});

client.login(token.token);