const { Client } = require("discord.js");
const fs = require("fs");
const path = require("path"); 

const token = process.env.CLIENT_SECRET;
const target = process.env.TARGET_ID;
const file = path.join(__dirname, "../message.md");

const main = async () => {

    const client = new Client({
        intents: [
            "DirectMessages"
        ]
    });

    const message = await new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if(err) reject(err);
            resolve(data);
        });
    })

    client.login(token);
    const responseDelay = 24 * 3600 * 1000; // 1 día

    // 1 dia son 24h 1h son 3600s por ende sería 24 * 3600 * 1000 
    setInterval(async () => {
        const user = await client.users.fetch(target);
        await user.send( message.substring(0, 1854));
        await user.send( message.substring(1854, message.length));
    }, responseDelay);
}

main();