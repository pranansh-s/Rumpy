const { Client, GatewayIntentBits, Partials } = require('discord.js');
const snoowrap = require('snoowrap');
require('dotenv').config();

const client = new Client();
let bot;

const getRandomPost = async(subreddit, cnt) => {
    try{
        const subr = await bot.getSubreddit(subreddit);
        const post = await subr.getRandomSubmission();        

	if(cnt >= 10) return "Could not find suitable post";
        if(post.is_video || post.url.includes('gallery') || post.url.includes('comments')) return getRandomPost(subreddit, cnt + 1);
        return (post.url) ? post.url : `Could not find subreddit: **${subreddit}**`;
    }
    catch{
        return `Could not find subreddit: **${subreddit}**`;
    }
}

client.on('ready', () => {
    bot = new snoowrap({
        userAgent: 'blob',
        clientId: 'ySQ511mZjopXSw',
        clientSecret: 'ZBTwgSog5sWBgwXrG5CyiXvWgZ0g-Q',
        refreshToken: '369819263364-QUXpS0WT6cSp1T9qUuPq1U3Mmk3ogg'
    });
    
});

client.on('message', async(mssg) => {
    if(mssg.content.startsWith('?rm ')){
        if(mssg.content.substring(4) == 'help'){
            mssg.channel.send("It's not rocket science bb, just put a subreddit name after `?rm`. Like so `?rm monke`");
        }
        else{
            const img = await getRandomPost(mssg.content.substring(4), 0);
            mssg.channel.send(img);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);