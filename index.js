const Discord = require("discord.js");
const { token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();
let playing = false;

client.once("ready", () => {
    console.log("Ready!");
});

client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

client.once("disconnect", () => {
    console.log("Disconnect!");
});

client.on("message", async message => {
    if (message.author.bot) return;

    if (message.content === `polska gurom`) {
        execute(message);
        return;
    }
});

async function execute(message) {
    if(playing) return;
    const voiceChannel = message.member.voice.channel;
    const connection = await voiceChannel.join();

    const songInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=skVg5FlVKS0');
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    playing = true;
    const dispatcher = connection
        .play(ytdl(song.url))
        .on("finish", () => {
            voiceChannel.leave();
            playing = false;
        })

    dispatcher.setVolumeLogarithmic(1);
    message.channel.send(`WE DID IT KURWA, POLSKA GUROM`);
}

client.login(process.env.BOT_TOKEN);