const config = require('../../config.json')
const client = require('../index.js');
client.on('messageCreate', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(config.userPrefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(config.userPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
    
})