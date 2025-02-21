const { Client } = require("discord.js");
const fs = require("fs");
const  { getFolder, FOLDER_PATH } = require("./utils.js");  
const { backend } = require('./backend.js');
const { response } = require("express");

const token = process.env.CLIENT_SECRET;
const target = process.env.TARGET_ID;
const gif = process.env.GIF_URL;
const port = process.env.PORT;
const responseDelay = process.env.RESPONSE_DELAY * 1000;

const readText = async (file) => await new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
})

const sendMessages = async (client, delay) => {

    setInterval(async () => {

        const randomFile = Math.floor(Math.random() * getFolder().length);
        const user = await client.users.fetch(target);
        let msg = await readText(FOLDER_PATH + '/' + getFolder()[randomFile]);
        for (let index = 0; index < msg.length; index+=2000) {
            await user.send(msg.substring(index, index + 2000)); 
        }
        await user.send(gif);
    }, delay);
}


const client = new Client({
    intents: [
        "DirectMessages"
    ]
});

client.login(token);

sendMessages(client, responseDelay);

backend(port);