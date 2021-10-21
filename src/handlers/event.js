const {readdirSync} = require('fs');
module.exports = (client) => {
console.log(__dirname)
  readdirSync("./src/events/").forEach((file) => {
    const events = readdirSync("./src/events/").filter((file) => file.endsWith(".js"))
    for(let file of events) {
      let pull = require(`../events/${file}`);
      if(pull.name){
        client.events.set(pull.name, pull)
      } else {
        continue;
      }
    }
  })
  console.log("Event Handler is ready")
}