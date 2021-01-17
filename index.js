const Discord = require("discord.js");
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

    if (message.content === `es`) {
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

    const songInfoNew = await ytdl.getInfo('https://www.youtube.com/watch?v=wGeFVtLo1RA');
    const songNew = {
        title: songInfoNew.videoDetails.title,
        url: songInfoNew.videoDetails.video_url,
    }

    playing = true;
    const dispatcher = connection
        .play(ytdl(song.url))
        .on("finish", () => {
            const dispatcherNew = connection
                .play(ytdl(songNew.url))
                .on("finish", () => {
                    voiceChannel.leave();
                    playing = false;
                })

            dispatcherNew.setVolumeLogarithmic(1);
        })

    dispatcher.setVolumeLogarithmic(1);
    message.channel.send(`WE DID IT KURWA, POLSKA GUROM`);
}

client.login(process.env.BOT_TOKEN);